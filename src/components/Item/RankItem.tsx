import classNames from 'classnames/bind'
import styles from './Item.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface RankItemData {
  colorWidth: string
  state: string
  ImgSrc: string
  ImgAlt: string
  name: string
  info: string
  like: string
  count: string
}

interface RankItemProps {
  items: RankItemData[]
  type?: 'col' | 'row' | 'mix'
}

export default function RankItem({ items, type = 'col' }: RankItemProps) {
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
    <ul className={cx('rank-container', type)}>
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
