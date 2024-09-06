import classNames from 'classnames/bind'
import styles from './Item.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface CheckItemData {
  imgSrc: string
  label: string
  id: string
  checked: boolean
  onChange: (id: string) => void
}

interface CheckItemProps {
  items: CheckItemData[]
  type?: 'two' | 'three'
}

export default function CheckItem({ items, type = 'two' }: CheckItemProps) {
  return (
    <div className={cx('check-container', type)}>
      {items.map(item => (
        <div className={cx('check-item')} key={item.id}>
          <input
            type="checkbox"
            id={`item-${item.id}`}
            checked={item.checked}
            onChange={() => item.onChange(item.id)}
            style={{ display: 'none' }}
          />
          <label htmlFor={`item-${item.id}`} className={cx('item', { active: item.checked })}>
            <figure className={cx('thumbnail')}>
              <img src={item.imgSrc} alt={item.label} />
            </figure>
            <div className={cx('label')}>
              {item.checked ? (
                <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
              ) : null}
              {item.label}
            </div>
          </label>
        </div>
      ))}
    </div>
  )
}
