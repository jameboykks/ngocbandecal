// Per-IP rate limiting for the image generator.
// - If Upstash Redis REST env vars are provided, uses a shared cross-instance
//   counter (reliable on Vercel serverless).
// - Otherwise falls back to an in-memory counter (fine for localhost / dev and
//   a soft guard in a single warm serverless instance).

export type RateResult = { ok: boolean; remaining: number; limit: number };

type Opts = {
  limit?: number;
  windowMs?: number;
  upstashUrl?: string;
  upstashToken?: string;
};

const DEFAULT_LIMIT = 3;
const DEFAULT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h

const memory = new Map<string, { count: number; reset: number }>();

function memoryLimit(key: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();
  const rec = memory.get(key);
  if (!rec || now > rec.reset) {
    memory.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, limit };
  }
  if (rec.count >= limit) return { ok: false, remaining: 0, limit };
  rec.count += 1;
  return { ok: true, remaining: limit - rec.count, limit };
}

async function upstashLimit(
  url: string,
  token: string,
  key: string,
  limit: number,
  windowSec: number,
): Promise<RateResult> {
  const headers = { Authorization: `Bearer ${token}` };
  const incrRes = await fetch(`${url}/incr/${encodeURIComponent(key)}`, { headers });
  const incr = (await incrRes.json()) as { result?: number };
  const count = incr.result ?? 1;
  if (count === 1) {
    await fetch(`${url}/expire/${encodeURIComponent(key)}/${windowSec}`, { headers });
  }
  return { ok: count <= limit, remaining: Math.max(0, limit - count), limit };
}

/** Consume one unit for `ip`. Returns ok=false once the limit is exceeded. */
export async function checkRateLimit(ip: string, opts: Opts = {}): Promise<RateResult> {
  const limit = opts.limit ?? DEFAULT_LIMIT;
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS;
  const key = `wrapgen:${ip}`;

  if (opts.upstashUrl && opts.upstashToken) {
    try {
      return await upstashLimit(opts.upstashUrl, opts.upstashToken, key, limit, Math.ceil(windowMs / 1000));
    } catch {
      // network/Upstash error — fall back to in-memory so the app keeps working
    }
  }
  return memoryLimit(key, limit, windowMs);
}

/** Extract the caller IP from proxy headers (Vercel) or the socket (local). */
export function getClientIp(headers: Record<string, unknown>, socketAddr?: string): string {
  const xff = headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  const real = headers['x-real-ip'];
  if (typeof real === 'string' && real.length) return real;
  return socketAddr || 'unknown';
}
