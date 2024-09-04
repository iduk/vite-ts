import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import '@/styles/_layout.scss'
import Appbar from '@/components/Layout/Appbar'
import Tabbar from '@/components/Layout/Tabbar'

export default function GlobalLayout() {
  return (
    <>
      <Appbar />
      <div className="content">
        <Suspense fallback={'loading...'}>
          <Outlet />
        </Suspense>
      </div>
      <Tabbar />
    </>
  )
}
