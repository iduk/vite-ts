import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    // SCSS 전역 사용
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @import "variables";
              `,
            },
        },
    },
})
