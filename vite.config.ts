import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `vite dev` does not run the Vercel serverless functions in /api, so the chatbot
 * got a 404 locally while working fine in production. This mounts the real handlers
 * as dev-only middleware with a minimal Vercel-style req/res shim.
 */
const DEV_API_ROUTES = ['chat', 'apply', 'fee-preference']
// /api/* keys are server-side only and are never exposed to the client
const DEV_API_ENV_KEYS = [
  'GROQ_API_KEY',
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_SHEET_ID',
  'FEE_LINK_SECRET',
  'SITE_URL'
]

function devApiPlugin(): Plugin {
  return {
    name: 'kgs-dev-api',
    apply: 'serve',
    configureServer(server) {
      for (const route of DEV_API_ROUTES) {
        server.middlewares.use(`/api/${route}`, async (req, res) => {
          try {
            const env = loadEnv(server.config.mode, process.cwd(), '')
            for (const key of DEV_API_ENV_KEYS) {
              if (!process.env[key] && env[key]) process.env[key] = env[key]
            }

            let raw = ''
            for await (const chunk of req) raw += chunk

            const url = new URL(req.originalUrl || req.url || '/', 'http://localhost')
            const mod = await server.ssrLoadModule(`/api/${route}.js`)
            const shimReq = {
              method: req.method,
              headers: req.headers,
              query: Object.fromEntries(url.searchParams),
              body: raw ? JSON.parse(raw) : {},
              socket: req.socket
            }
            const shimRes = {
              statusCode: 200,
              status(code: number) {
                this.statusCode = code
                return this
              },
              setHeader(name: string, value: string) {
                res.setHeader(name, value)
                return this
              },
              json(payload: unknown) {
                res.statusCode = this.statusCode
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(payload))
              },
              send(body: string) {
                res.statusCode = this.statusCode
                res.end(body)
              },
              end(body?: string) {
                res.statusCode = this.statusCode
                res.end(body)
              }
            }
            await mod.default(shimReq, shimRes)
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Dev API error', details: String(err) }))
          }
        })
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    }),
    devApiPlugin()
  ],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Stable vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'bootstrap-vendor': ['react-bootstrap', 'bootstrap'],
          'animation-vendor': ['framer-motion'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'icons-vendor': ['react-icons/fa', 'react-icons/si', 'react-icons/bs', 'react-icons/md']
        }
      }
    },
    target: 'es2015',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    // Enable tree shaking
    modulePreload: true
  },
  server: {
    port: 3000,
    host: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  preview: {
    port: 3000,
    host: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-bootstrap', 
      'framer-motion', 
      '@reduxjs/toolkit',
      'react-icons/fa',
      'react-icons/si',
      'react-icons/bs',
      'react-icons/md'
    ],
    exclude: ['react-icons']
  },
  ssr: {
    noExternal: ['react-icons']
  }
})
