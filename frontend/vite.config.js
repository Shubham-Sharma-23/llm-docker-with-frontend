import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
      port: 3000,
    watch: {
      usePolling: true, // Needed for Docker on some systems
    },
    hmr: {
      clientPort: 3000, // Needed for Docker
      host: '0.0.0.0', // Needed for Docker
    },
    proxy: {
      '/api': {
        target: 'http://ollama:11434',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})