import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PixelDuk from 'assets/images/pixelduk.svg'

export default function GlobalLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false) // Drawer 표시 상태

    const openDrawer = () => {
        setIsVisible(true) // Drawer 표시
        setTimeout(() => {
            setIsDrawerOpen(true) // 애니메이션 활성화
        }, 10) // 약간의 딜레이로 애니메이션 시작
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false) // 애니메이션 비활성화
        setTimeout(() => {
            setIsVisible(false) // DOM에서 제거
        }, 300) // 애니메이션 지속 시간과 동일하게 설정
    }

    const menuItems = [
        { label: 'Home', href: '/home' },
        { label: 'Products', href: '/products' },
        { label: 'Test', href: '/test' },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between border-b">
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between  border-l border-r px-4 py-2">
                    <h1 className="text-lg font-bold">
                        <a href="/">
                            <img src={PixelDuk} alt="PixelDuk" style={{ height: '4vh' }} />
                        </a>
                    </h1>
                    {/* 햄버거 버튼 */}
                    <button
                        className="block sm:hidden px-3 py-2 text-xl hover:bg-gray-100 transition"
                        onClick={openDrawer}
                    >
                        ☰
                    </button>

                    {/* 데스크톱 네비게이션 */}
                    <nav className="hidden sm:flex gap-2">
                        {menuItems.map(item => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm md:text-base bg-gray-200 rounded-md hover:bg-gray-300 transition"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Drawer */}
            {isVisible && (
                <div
                    className={`fixed inset-0 z-10 flex justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${
                        isDrawerOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeDrawer}
                >
                    <div
                        className={`w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ${
                            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        onClick={e => e.stopPropagation()} // Drawer 영역 클릭 방지
                    >
                        <div className="flex justify-end items-center p-3">
                            <button
                                className="text-xl hover:bg-gray-100 px-3 py-2 transition"
                                onClick={closeDrawer}
                            >
                                ✕
                            </button>
                        </div>
                        <nav className="flex flex-col p-4 gap-2">
                            {menuItems.map(item => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-2 transition"
                                    onClick={closeDrawer}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Content */}
            <Suspense fallback={'loading...'}>
                <div className="w-full max-w-screen-2xl mx-auto flex-1 flex flex-col border-l border-r">
                    <Outlet />
                </div>
            </Suspense>
        </div>
    )
}
