import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // Optimize build for SPA deployment
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@heroicons/vue']
        }
      }
    },
    // Generate source maps for better debugging
    sourcemap: false, // Disable in production for smaller builds
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Ensure assets are properly handled
    assetsDir: 'assets',
    // Generate manifest for better caching
    manifest: false,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Use absolute base for better SPA routing
  base: '/',
  // Preview server configuration for local testing
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
  // Define global constants
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  }
})
