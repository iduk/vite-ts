import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import '@/styles/_layout.scss'

const App: React.FC = () => {
  const element = useRoutes(routes)

  return (
    <div className="app">
      <main className="main">{element}</main>
    </div>
  )
}

export default App
