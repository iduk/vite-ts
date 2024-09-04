import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

const routeTitles: { [key: string]: string } = {
  '/': '홈',
  '/home': '홈',
  '/sample': '샘플',
  '/products': '상품 목록',
  '/products/:id': '상품 상세',
}

export default function Appbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const isHomePage = currentPath === '/'

  const canGoBack = () => {
    if (isHomePage) {
      return false
    }

    const slashCount = currentPath.split('/').length - 1

    return slashCount > 1 && window.history.length > 1
  }

  const getTitle = () => {
    for (const route in routeTitles) {
      const pattern = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}($|\\?)`)
      if (pattern.test(currentPath)) {
        return routeTitles[route]
      }
    }
    return '타이틀'
  }

  const showBackButton = canGoBack()

  return (
    <>
      <header className={cx('appbar')}>
        {showBackButton && (
          <button className={cx('appbar-back')} onClick={() => navigate(-1)}>
            <img src={sampleIcon} alt="Sample Icon" width={24} height={24} />
          </button>
        )}
        <h1 className={cx('appbar-title')}>{getTitle()}</h1>
      </header>
    </>
  )
}
