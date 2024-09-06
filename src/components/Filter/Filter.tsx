import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Filter.module.scss'

const cx = classNames.bind(styles)

interface FilterProps {
  filters: {
    id: string
    filterName: string
    count?: number
  }[]
  defaultActiveId?: string
}

export default function Filter({ filters, defaultActiveId }: FilterProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId ?? null)

  const handleClick = (id: string) => {
    if (id !== activeId) {
      setActiveId(id)
    }
  }

  return (
    <div className={cx('filter-container', 'hidden-scrollbar')}>
      {filters.map(filter => (
        <button
          key={filter.id}
          className={cx('filter', { active: filter.id === activeId })}
          onClick={() => handleClick(filter.id)}
        >
          {filter.filterName}
          {filter.count !== undefined && <span>{filter.count}</span>}
        </button>
      ))}
    </div>
  )
}
