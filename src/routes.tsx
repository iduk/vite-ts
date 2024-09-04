import IndexPage from './pages'
import GlobalLayout from './pages/_layout'
import Home from './pages/home'
import ProductIndex from './pages/products'
import ProductDetail from './pages/products/[id]'

export const routes = [
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            { path: '/', element: <IndexPage /> },
            { path: '/home', element: <Home /> },
            { path: '/products', element: <ProductIndex /> },
            { path: '/products/:id', element: <ProductDetail /> },
        ],
    },
]

export const pages = [{ route: '/' }, { route: '/products' }, { route: '/products/:id' }]
