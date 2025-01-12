import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:11434',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },

    css: {
        modules: {
            // Obfuscation
            generateScopedName: '[hash:base64:5]', // 예: "abcd1"
        },
        preprocessorOptions: {
            // SCSS 전역 사용
            scss: {
                additionalData: `
              @use "./src/assets/styles/variables" as var;
              `,
            },
        },
        postcss: './postcss.config.js',
    },
})
