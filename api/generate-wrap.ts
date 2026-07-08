import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateWrapSheet } from './_lib/generate.js';
import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';

// gpt-image-1 (high quality) can take ~30-60s — allow the function room to run.
export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const { image, styleId, customText } = (req.body || {}) as {
      image?: string;
      styleId?: string;
      customText?: string;
    };
    if (!image) {
      res.status(400).json({ error: 'Thiếu ảnh xe.' });
      return;
    }

    const limit = Number(process.env.GEN_LIMIT) || 3;
    const ip = getClientIp(req.headers as Record<string, unknown>, req.socket?.remoteAddress);
    const rl = await checkRateLimit(ip, {
      limit,
      upstashUrl: process.env.UPSTASH_REDIS_REST_URL,
      upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    if (!rl.ok) {
      res.status(429).json({
        error: `Bạn đã dùng hết ${limit} lượt tạo mẫu miễn phí hôm nay. Nhắn Zalo để được Ngọc Bàn tư vấn trực tiếp nhé!`,
      });
      return;
    }

    const out = await generateWrapSheet({
      image,
      styleId,
      customText,
      provider: process.env.IMAGE_PROVIDER,
      openaiKey: process.env.OPENAI_API_KEY,
      geminiKey: process.env.GEMINI_API_KEY,
      falKey: process.env.FAL_KEY,
    });
    res.status(200).json({ image: out, remaining: rl.remaining });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message || 'Lỗi máy chủ.' });
  }
}
