import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
    ],
    server: {
        host: true,
        port: 8081,
        watch: {
            usePolling: true,
          },
    }
})
