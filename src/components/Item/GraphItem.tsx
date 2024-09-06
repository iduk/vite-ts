import classNames from 'classnames/bind'
import styles from './Item.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface GraphItemProps {
  items: { count: string; height: string; name: string }[]
}

export default function GraphItem({ items }: GraphItemProps) {
  const columnCount = items.length

  return (
    <ul
      className={cx('graph-container')}
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {items.map((item, index) => (
        <li key={index} className={cx('graph-item')}>
          <span className={cx('count')}>
            <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
            {item.count}
          </span>
          <div
            className={cx('graph')}
            style={{ height: `calc(300px * ${parseFloat(item.height) / 100})` }}
          ></div>
          <span className={cx('rank')}>{index + 1}위</span>
          <p className={cx('name')}>{item.name}</p>
        </li>
      ))}
    </ul>
  )
}
