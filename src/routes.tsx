import IndexPage from '@/pages/index'
import GlobalLayout from '@/pages/_layout'
import Home from '@/pages/home'
import Sample from '@/pages/sample'
import ProductIndex from '@/pages/products'
import ProductDetail from '@/pages/products/[id]'

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/home', element: <Home /> },
      { path: '/sample', element: <Sample /> },
      { path: '/products', element: <ProductIndex /> },
      { path: '/products/:id', element: <ProductDetail /> },
    ],
  },
]

export const pages = [{ route: '/' }, { route: '/products' }, { route: '/products/:id' }]
