import { useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

export default function Tabbar() {
  const navigate = useNavigate()
  const handleButtonClick = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <div className={cx('tabbar')}>
        <button onClick={() => handleButtonClick('/')}>
          <img src={sampleIcon} alt="Sample Icon" width={20} height={20} />
          <span>홈</span>
        </button>
        <button onClick={() => handleButtonClick('/sample')}>
          <img src={sampleIcon} alt="Sample Icon" width={20} height={20} />
          <span>샘플</span>
        </button>
        <button onClick={() => handleButtonClick('/products')}>
          <img src={sampleIcon} alt="Sample Icon" width={20} height={20} />
          <span>상품목록</span>
        </button>
      </div>
    </>
  )
}
