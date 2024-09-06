import classNames from 'classnames/bind'
import styles from './Item.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface VoteItemData {
  imgSrc: string
  imgAlt: string
  brand: string
  count: string
  title: string
}

interface VoteItemProps {
  items: VoteItemData[]
  type?: 'row' | 'col'
}

export default function VoteItem({ items, type = 'col' }: VoteItemProps) {
  return (
    <div className={cx('vote-container', type)}>
      {items.map((item, index) => (
        <button className={cx('vote-item')} key={index}>
          <figure className={cx('thumbnail')}>
            <img src={item.imgSrc} alt={item.imgAlt} />
          </figure>
          <div>
            <span className={cx('brand')}>{item.brand}</span>
            <span className={cx('count')}>
              <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
              {item.count}
            </span>
          </div>
          <p className={cx('title')}>{item.title}</p>
        </button>
      ))}
    </div>
  )
}
