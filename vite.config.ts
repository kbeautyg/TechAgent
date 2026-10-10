import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Сервер заказов при разработке: cd api && ./dev.sh (порт 8787)
  server: {
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
