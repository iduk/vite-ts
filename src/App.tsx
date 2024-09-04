import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import '@assets/styles/global.scss'

const App = () => {
    const elem = useRoutes(routes)
    return elem
}

export default App
