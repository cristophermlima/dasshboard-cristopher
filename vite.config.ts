import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://reactts.dnc.group', // URL da API
        changeOrigin: true, // Habilita mudança de origem para evitar problemas de CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo "/api" da URL
      },
    },
  },
})
