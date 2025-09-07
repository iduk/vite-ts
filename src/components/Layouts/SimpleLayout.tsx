import { Outlet } from 'react-router-dom'

export default function SimpleLayout() {
    return (
        <div className="min-h-dvh flex flex-col relative">
            {/* 뒤로가기 버튼 */}
            <button
                className="p-2 text-sm text-gray-500 hover:underline absolute top-2 left-2 z-10"
                onClick={() => window.history.back()}
            >
                ← Back
            </button>
            {/* Content */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>
        </div>
    )
}
