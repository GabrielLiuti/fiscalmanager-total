import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Corrige o caminho base para deploy no Render
export default defineConfig({
  plugins: [react()],
  base: '/', // <---- ESSENCIAL!
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    host: true,
  },
})
