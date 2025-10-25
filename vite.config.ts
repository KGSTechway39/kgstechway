import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    })
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
