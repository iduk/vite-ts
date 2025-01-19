import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PixelDuk from 'assets/images/pixelduk.svg'

export default function GlobalLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false) // Drawer 표시 상태

    const openDrawer = () => {
        setIsVisible(true) // Drawer 표시
        setTimeout(() => {
            setIsDrawerOpen(true)
        }, 10)
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false)
        setTimeout(() => {
            setIsVisible(false)
        }, 300)
    }

    const menuItems = [
        { label: 'Home', href: '/home' },
        { label: 'Products', href: '/products' },
        { label: 'Board', href: '/board' },
        { label: 'Test', href: '/test' },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between border-y">
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between  border-l border-r">
                    <h1 className="text-lg font-bold">
                        <a href="/">
                            <img
                                src={PixelDuk}
                                className="min-h-12"
                                style={{ height: '5vh' }}
                                alt="PixelDuk"
                            />
                        </a>
                    </h1>
                    {/* 햄버거 버튼 */}
                    <button
                        className="block h-full sm:hidden px-3 py-2 text-xl hover:bg-gray-100 transition border-l"
                        onClick={openDrawer}
                    >
                        <span className="block">☰</span>
                    </button>

                    {/* 데스크톱 네비게이션 */}
                    <nav className="hidden sm:flex gap-2">
                        {menuItems.map(item => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm md:text-base rounded-md hover:bg-slate-50 transition"
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

            <footer className="flex items-center justify-center border-y">
                <div className="w-full max-w-screen-2xl mx-auto p-4 border-l border-r">
                    <div className="flex justify-between items-center">
                        <p>
                            <a href="" className="text-sm text-gray-500 hover:underline">
                                Terms of Service
                            </a>
                        </p>
                        <p className="text-sm">©1986 iDuk</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
