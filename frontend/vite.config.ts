import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {
      '/iotapp': {
        target: 'https://moriahmkt.com', // Dirección correcta del servidor
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/iotapp/, ''),
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})