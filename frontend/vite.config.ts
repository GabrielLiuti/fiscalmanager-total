import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Corrige a base para Render (serve direto da raiz)
export default defineConfig({
  plugins: [react()],
  base: '/', // <-- ESSENCIAL: remove o /fiscalmanager-total/
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    host: true,
  },
})
