import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), tsconfigPaths()],
    server: {
        headers: {
            'Cache-Control': 'no-store', // 캐시 비활성화
        },
        proxy: {
            '/api': {
                target: 'http://localhost:5173', // Vite 개발 서버
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
                  @use "/src/assets/styles/_variables.scss" as *;
                  `,
            },
        },
        postcss: {
            plugins: [tailwindcss()],
        },
    },
})
