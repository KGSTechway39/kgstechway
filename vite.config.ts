import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `vite dev` does not run the Vercel serverless functions in /api, so the chatbot
 * got a 404 locally while working fine in production. This mounts the real handler
 * as dev-only middleware with a minimal Vercel-style req/res shim.
 */
function devApiPlugin(): Plugin {
  return {
    name: 'kgs-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          // /api/* keys are server-side only and are never exposed to the client
          const env = loadEnv(server.config.mode, process.cwd(), '')
          if (!process.env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY

          let raw = ''
          for await (const chunk of req) raw += chunk

          const mod = await server.ssrLoadModule('/api/chat.js')
          const shimReq = { method: req.method, body: raw ? JSON.parse(raw) : {} }
          const shimRes = {
            statusCode: 200,
            status(code: number) {
              this.statusCode = code
              return this
            },
            json(payload: unknown) {
              res.statusCode = this.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
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
