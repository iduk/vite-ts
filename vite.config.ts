import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],

    css: {
        modules: {
            // Obfuscation
            generateScopedName: '[hash:base64:5]', // 예: "abcd1"
        },
        preprocessorOptions: {
            // SCSS 전역 사용
            scss: {
                additionalData: `
              @import "./src/assets/styles/variables";
              `,
            },
        },
        postcss: './postcss.config.js',
    },
})
