import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Layout.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

export default function Header() {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko')
  const toggleLanguage = (lang: 'ko' | 'en') => {
    setLanguage(lang)
  }

  const location = useLocation()
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return '메인'
      case '/home':
        return '홈'
      case '/sample':
        return '샘플'
      case '/products':
        return '제품 목록'
      case '/products/:id':
        return '제품 상세'
      default:
        return '페이지'
    }
  }

  return (
    <>
      <header className={cx('header')}>
        <button className={cx('home-btn')}>
          <img src={sampleIcon} alt="Sample Icon" width={24} height={24} />
        </button>
        <h1 className={cx('title')}>{getTitle()}</h1>
        <div className={cx('lang-btn')}>
          <button
            className={cx({ active: language === 'ko' })}
            onClick={() => toggleLanguage('ko')}
          >
            한글
          </button>
          <button
            className={cx({ active: language === 'en' })}
            onClick={() => toggleLanguage('en')}
          >
            ENG
          </button>
        </div>
      </header>
    </>
  )
}
