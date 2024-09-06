import classNames from 'classnames/bind'
import styles from './item.module.scss'
import sampleIcon from '@/assets/react.svg'

const cx = classNames.bind(styles)

interface RankItemProps {
  items: {
    colorWidth: string
    state: string
    ImgSrc: string
    ImgAlt: string
    name: string
    info: string
    like: string
    count: string
  }[]
}

export default function RankItem({ items }: RankItemProps) {
  const getStateText = (state: string) => {
    switch (state) {
      case 'up':
        return (
          <>
            <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
            상승
          </>
        )
      case 'keep':
        return (
          <>
            <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
            유지
          </>
        )
      case 'down':
        return (
          <>
            <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
            하락
          </>
        )
      default:
        return ''
    }
  }

  return (
    <ul className={cx('rank-container')}>
      {items.map((item, index) => (
        <li className={cx('rank-item')} key={index}>
          <span className={cx('color')} style={{ width: item.colorWidth }}></span>
          <span className={cx('state')}>{getStateText(item.state)}</span>
          <span className={cx('rank')}>{index + 1}</span>
          <figure className={cx('thumbnail')}>
            <img src={item.ImgSrc} alt={item.ImgAlt} />
          </figure>
          <div>
            <strong className={cx('name')}>{item.name}</strong>
            <p className={cx('info')}>{item.info}</p>
            <p className={cx('like')}>{item.like}</p>
            <span className={cx('count')}>
              <img src={sampleIcon} alt="Sample Icon" width={16} height={16} /> {item.count}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
