import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias para carpetas clave (usa rutas absolutas)
      '@': path.resolve(__dirname, './src'), // Raíz del proyecto
      '@api': path.resolve(__dirname, './src/hooks/api'),
      '@components/form': path.resolve(__dirname, './src/components/form'),
      '@components/button': path.resolve(__dirname, './src/components/form/button'),
      '@components/select': path.resolve(__dirname, './src/components/form/select/CustomSelect'),
      '@components/layout': path.resolve(__dirname, './src/components/layout'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});