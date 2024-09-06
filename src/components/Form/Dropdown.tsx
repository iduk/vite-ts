import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './Form.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface DropdownProps {
  label?: string
  placeholder: string
  value?: string
  items: (string | JSX.Element)[]
  hasError: boolean
  setHasError: (hasError: boolean) => void
  onChange: (value: string) => void
  errorMessage?: string // Add errorMessage to props
}

export default function Dropdown({
  label,
  placeholder,
  value,
  items,
  hasError,
  setHasError,
  onChange,
  errorMessage,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    onChange(selectedValue)
  }, [selectedValue, onChange])

  const handleOptionClick = (item: string | JSX.Element) => {
    if (typeof item === 'string') {
      setSelectedValue(item)
    } else {
      setSelectedValue('')
    }
    setIsOpen(false)
    setHasError(false)
  }

  return (
    <div className={cx('dropdown')}>
      {label && <label className={cx('label')}>{label}</label>}
      <div className={cx('dropdown-content')}>
        <button className={cx('trigger', { error: hasError })} onClick={() => setIsOpen(!isOpen)}>
          {!selectedValue && placeholder && (
            <span className={cx('placeholder')}>{placeholder}</span>
          )}
          {selectedValue && <span className={cx('value')}>{selectedValue}</span>}
          <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
        </button>
        {hasError && errorMessage && <p className={cx('message')}>{errorMessage}</p>}
        {isOpen && (
          <div className={cx('option-container')}>
            <ul className={cx('option')}>
              {items.map((item, index) => (
                <li
                  key={index}
                  className={cx('item', {
                    active: selectedValue === (typeof item === 'string' ? item : ''),
                  })}
                >
                  <button onClick={() => handleOptionClick(item)}>{item}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
