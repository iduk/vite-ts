import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function GlobalLayout() {
    return (
        <div style={{ padding: 20, border: '1px solid #000', backgroundColor: '#f0f0f0' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="/home">home</a>
                <a href="/products">products</a>
            </div>
            <Suspense fallback={'loading...'}>
                <Outlet />
            </Suspense>
        </div>
    )
}
