import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

// Dev-only: Vite doesn't run the /api serverless functions, so we serve
// POST /api/generate-wrap here (reusing the exact same core logic) to allow
// full localhost preview with `npm run dev`.
type ApiEnv = {
  provider?: string
  openaiKey?: string
  geminiKey?: string
  falKey?: string
  limit?: number
  upstashUrl?: string
  upstashToken?: string
}

function apiDevPlugin(apiEnv: ApiEnv): Plugin {
  return {
    name: 'ngocban-api-dev',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if ((req.url || '').split('?')[0] !== '/api/generate-wrap') return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        let body = ''
        req.on('data', (c: Buffer) => (body += c))
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json')
          try {
            const { image, styleId, customText } = JSON.parse(body || '{}')

            const limit = apiEnv.limit || 3
            const rlMod = await server.ssrLoadModule('/api/_lib/rateLimit.ts')
            const ip = rlMod.getClientIp(req.headers as Record<string, unknown>, req.socket?.remoteAddress)
            const rl = await rlMod.checkRateLimit(ip, {
              limit,
              upstashUrl: apiEnv.upstashUrl,
              upstashToken: apiEnv.upstashToken,
            })
            if (!rl.ok) {
              res.statusCode = 429
              res.end(JSON.stringify({ error: `Bạn đã dùng hết ${limit} lượt tạo mẫu miễn phí hôm nay. Nhắn Zalo để được Ngọc Bàn tư vấn trực tiếp nhé!` }))
              return
            }

            const mod = await server.ssrLoadModule('/api/_lib/generate.ts')
            const out = await mod.generateWrapSheet({
              image,
              styleId,
              customText,
              provider: apiEnv.provider,
              openaiKey: apiEnv.openaiKey,
              geminiKey: apiEnv.geminiKey,
              falKey: apiEnv.falKey,
            })
            res.end(JSON.stringify({ image: out, remaining: rl.remaining }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: (e as Error).message || 'Error' }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      apiDevPlugin({
        provider: env.IMAGE_PROVIDER,
        openaiKey: env.OPENAI_API_KEY,
        geminiKey: env.GEMINI_API_KEY,
        falKey: env.FAL_KEY,
        limit: Number(env.GEN_LIMIT) || 3,
        upstashUrl: env.UPSTASH_REDIS_REST_URL,
        upstashToken: env.UPSTASH_REDIS_REST_TOKEN,
      }),
    ],
  }
})
