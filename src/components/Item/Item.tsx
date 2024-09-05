import classNames from 'classnames/bind'
import styles from './item.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface ItemProps {
  imgSrc: string
  label: string
  id: string
  checked: boolean
  onChange: (id: string) => void
}

export default function Item({ imgSrc, label, id, checked, onChange }: ItemProps) {
  return (
    <div className={cx('item-container')}>
      <input
        type="checkbox"
        id={`item-${id}`}
        checked={checked}
        onChange={() => onChange(id)}
        style={{ display: 'none' }}
      />
      <label htmlFor={`item-${id}`} className={cx('item', { active: checked })}>
        <figure className={styles.figure}>
          <img src={imgSrc} alt={label} className={styles.img} />
        </figure>
        <div className={styles.label}>
          {checked ? <img src={sampleIcon} alt="Sample Icon" width={16} height={16} /> : null}
          {label}
        </div>
      </label>
    </div>
  )
}
