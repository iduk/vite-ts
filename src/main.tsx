import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')!
const app = createRoot(rootElement)

// Enable mocking in development mode
async function enableMocking() {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
        const { worker } = await import('./mocks/browser')
        worker.start({
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
            onUnhandledRequest: 'bypass', // 정의되지 않은 요청은 실제 서버로 전달
        })
    }

    const { worker } = await import('./mocks/browser')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start()
}

enableMocking().then(() => {
    app.render(
        <StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>
    )
})
