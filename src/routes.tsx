/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import GlobalLayout from './pages/_layout'

const Index = lazy(() => import('./pages/index'))
const ProductsIndex = lazy(() => import('./pages/products/index'))
const ProductsId = lazy(() => import('./pages/products/[id]'))

export const routes = [
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            { path: '/', element: <Index /> },
            { path: '/products', element: <ProductsIndex /> },
            { path: '/products/:id', element: <ProductsId /> },
        ],
    },
]

export const pages = [{ route: '/' }, { route: '/products' }, { route: '/products/:id' }]
