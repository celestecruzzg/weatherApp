import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    proxy: {
      '/iotapp': {
        target: 'https://moriahmkt.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/iotapp/, ''),
        secure: false // Solo para desarrollo, quitar en producción
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['mapbox-gl'], // Optimización específica para Mapbox
    exclude: ['@mapbox/mapbox-gl-draw'] // Excluir si no se usa
  },
  build: {
    commonjsOptions: {
      include: [/mapbox-gl/, /node_modules/], // Soporte para CommonJS
    },
  },
});