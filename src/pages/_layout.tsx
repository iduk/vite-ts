import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import '@/styles/_layout.scss'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Tabbar from '@/components/Layout/Tabbar'

export default function GlobalLayout() {
  const [footerContent, setFooterContent] = useState<React.ReactNode>(null)

  return (
    <>
      <Header />
      <div className="content">
        <Suspense fallback={'loading...'}>
          <Outlet context={{ setFooter: setFooterContent }} />
        </Suspense>
      </div>
      <Footer customContent={footerContent} />
      <Tabbar />
    </>
  )
}
