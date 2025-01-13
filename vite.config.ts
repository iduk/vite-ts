import { viteMockServe } from 'vite-plugin-mock'
import { ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    const isDev = command === 'serve'
    console.log(isDev)
    return {
        base: '/',
        plugins: [
            react(),
            tsconfigPaths(),
            viteMockServe({
                mockPath: 'src/mock', // 목업 데이터 폴더 설정
                enable: true, // 개발 환경에서만 활성화
                cors: true, // CORS 허용
                watchFiles: true, // 파일 변경 감지
            }),
        ],
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

        build: {
            rollupOptions: {
                output: {
                    format: 'es', // ES 모듈 형식으로 출력
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
                  @import "/src/assets/styles/_variables.scss";
                  `,
                },
            },
            postcss: './postcss.config.js',
        },
    }
}
