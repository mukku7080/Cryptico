import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/', // Polyfill Buffer
    },
  },
  define: {
    global: 'window', // Polyfill global if needed
  },
})
