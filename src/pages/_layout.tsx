import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function GlobalLayout() {
    return (
        <div>
            <Suspense fallback={'loading...'}>
                <Outlet />
            </Suspense>
        </div>
    )
}
