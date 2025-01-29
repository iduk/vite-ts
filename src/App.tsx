import { useRoutes } from 'react-router-dom'
import 'assets/styles/global.scss'
import './index.css'
import IndexPage from 'pages/index'
import GlobalLayout from 'pages/_layout'
import Home from 'pages/home'
import ProductIndex from 'pages/products'
import ProductDetail from 'pages/products/[id]'
import TestIndex from 'pages/test'
import BoardList from 'pages/board'
import BoardDetail from 'pages/board/[id]'
import GlobalModal from 'components/Modals'

// IOS support
const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

if (isIOS()) {
    // ios Safari에서 vh 단위 사용 시 대응
    const setViewportHeightForIOS = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', setViewportHeightForIOS)
    window.addEventListener('load', setViewportHeightForIOS)

    // 비정상적인 터치 이벤트 방지
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
    })
}

const App = () => {
    const routes = [
        {
            path: '/',
            element: <GlobalLayout />,
            children: [
                { path: '/', element: <IndexPage /> },
                { path: '/home', element: <Home /> },
                { path: '/products', element: <ProductIndex /> },
                { path: '/products/:id', element: <ProductDetail /> },
                { path: '/board', element: <BoardList /> },
                { path: '/board/:id', element: <BoardDetail /> },
                { path: '/test', element: <TestIndex /> },
            ],
        },
    ]
    const elem = useRoutes(routes)
    return (
        <>
            {elem}
            <GlobalModal />
        </>
    )
}

export default App
