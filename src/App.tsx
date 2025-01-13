import { useRoutes } from 'react-router-dom'
import 'assets/styles/global.scss'
import IndexPage from 'pages/index'
import GlobalLayout from 'pages/_layout'
import Home from 'pages/home'
import ProductIndex from 'pages/products'
import ProductDetail from 'pages/products/[id]'
import TestIndex from 'pages/test'

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
                { path: '/test', element: <TestIndex /> },
            ],
        },
    ]
    const elem = useRoutes(routes)
    return elem
}

export default App
