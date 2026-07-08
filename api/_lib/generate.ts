// Core image-generation logic shared by the Vercel function (prod) and the
// Vite dev middleware (localhost). No Vercel-specific types so it stays portable.
// Supports two swappable providers: OpenAI (gpt-image-1) and Google Gemini
// (gemini-2.5-flash-image, aka "Nano Banana"). Pick via IMAGE_PROVIDER env.

import { buildWrapPrompt } from './prompt';

type Provider = 'openai' | 'gemini' | 'fal';

type GenerateArgs = {
  image: string;            // data URL or bare base64 of the uploaded car photo
  styleId?: string;
  customText?: string;
  provider?: string;
  openaiKey?: string;
  geminiKey?: string;
  falKey?: string;
};

/**
 * Send the customer's car photo + a composed style prompt to the chosen image
 * model and return a data URL of the generated 6-view wrap design sheet.
 */
export async function generateWrapSheet(args: GenerateArgs): Promise<string> {
  const { image, styleId, customText } = args;
  if (!image) throw new Error('Chưa có ảnh xe.');

  const base64 = image.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
  const buf = Buffer.from(base64, 'base64');
  if (buf.length === 0) throw new Error('Ảnh không hợp lệ.');

  const prompt = buildWrapPrompt(styleId || '', customText || '');
  const provider: Provider =
    args.provider === 'gemini' ? 'gemini' : args.provider === 'fal' ? 'fal' : 'openai';

  if (provider === 'gemini') return geminiEdit(buf, prompt, args.geminiKey);
  if (provider === 'fal') return falKontextEdit(buf, prompt, args.falKey);
  return openaiEdit(buf, prompt, args.openaiKey);
}

// ── OpenAI gpt-image-1 ──────────────────────────────────────────────
const OPENAI_EDITS_URL = 'https://api.openai.com/v1/images/edits';

async function openaiEdit(buf: Buffer, prompt: string, apiKey?: string): Promise<string> {
  if (!apiKey) throw new Error('Thiếu OPENAI_API_KEY trên server.');

  const form = new FormData();
  form.append('model', 'gpt-image-1');
  form.append('image', new Blob([buf], { type: 'image/png' }), 'car.png');
  form.append('prompt', prompt);
  form.append('size', '1536x1024'); // landscape — fits a 2x3 sheet
  form.append('quality', 'medium');
  form.append('n', '1');

  const resp = await fetch(OPENAI_EDITS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  const data = (await resp.json()) as {
    data?: { b64_json?: string }[];
    error?: { message?: string };
  };
  if (!resp.ok) throw new Error(data?.error?.message || `OpenAI trả về lỗi ${resp.status}`);
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('OpenAI không trả về ảnh.');
  return `data:image/png;base64,${b64}`;
}

// ── Google Gemini 2.5 Flash Image ("Nano Banana") ───────────────────
const GEMINI_MODEL = 'gemini-2.5-flash-image';

async function geminiEdit(buf: Buffer, prompt: string, apiKey?: string): Promise<string> {
  if (!apiKey) throw new Error('Thiếu GEMINI_API_KEY trên server.');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: 'image/png', data: buf.toString('base64') } },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '16:9' },
    },
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await resp.json()) as {
    candidates?: { content?: { parts?: Array<{ inline_data?: { data?: string }; inlineData?: { data?: string } }> } }[];
    error?: { message?: string };
  };
  if (!resp.ok) throw new Error(data?.error?.message || `Gemini trả về lỗi ${resp.status}`);

  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inline_data?.data || p.inlineData?.data);
  const b64 = imgPart?.inline_data?.data || imgPart?.inlineData?.data;
  if (!b64) throw new Error('Gemini không trả về ảnh.');
  return `data:image/png;base64,${b64}`;
}

// ── FLUX.1 Kontext (Black Forest Labs) via fal.ai ───────────────────
const FAL_KONTEXT_URL = 'https://fal.run/fal-ai/flux-pro/kontext';

async function falKontextEdit(buf: Buffer, prompt: string, apiKey?: string): Promise<string> {
  if (!apiKey) throw new Error('Thiếu FAL_KEY trên server.');

  const resp = await fetch(FAL_KONTEXT_URL, {
    method: 'POST',
    headers: { Authorization: `Key ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      image_url: `data:image/png;base64,${buf.toString('base64')}`,
      aspect_ratio: '16:9', // landscape for the 6-panel sheet
      num_images: 1,
      output_format: 'png',
      safety_tolerance: '2',
    }),
  });
  const data = (await resp.json()) as {
    images?: { url?: string }[];
    detail?: unknown;
    error?: string;
  };
  if (!resp.ok) {
    const msg = typeof data?.detail === 'string' ? data.detail : data?.error || JSON.stringify(data?.detail || '');
    throw new Error(msg || `fal trả về lỗi ${resp.status}`);
  }
  const url = data.images?.[0]?.url;
  if (!url) throw new Error('fal không trả về ảnh.');
  if (url.startsWith('data:')) return url;

  // fal returns a hosted URL — fetch it and inline as a data URL for a
  // consistent response shape and reliable client-side download.
  const imgResp = await fetch(url);
  const arr = Buffer.from(await imgResp.arrayBuffer());
  const ct = imgResp.headers.get('content-type') || 'image/png';
  return `data:${ct};base64,${arr.toString('base64')}`;
}
