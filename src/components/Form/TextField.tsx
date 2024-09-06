import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Form.module.scss'
const cx = classNames.bind(styles)
import sampleIcon from '@/assets/react.svg'

interface TextFieldProps {
  label?: string
  placeholder: string
  errorMessage: string
  isSubmitted: boolean
}

export default function TextField({
  label,
  placeholder,
  errorMessage,
  isSubmitted,
}: TextFieldProps) {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleDelete = () => {
    setValue('')
  }

  return (
    <div className={cx('textfield')}>
      {label && <label className={cx('label')}>{label}</label>}
      <div className={cx('input', { error: isSubmitted && !value })}>
        <input type="text" placeholder={placeholder} value={value} onChange={handleChange} />
        {value && (
          <button className={cx('delete-btn')} onClick={handleDelete}>
            <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
            삭제
          </button>
        )}
      </div>
      {isSubmitted && !value && <p className={cx('message')}>{errorMessage}</p>}
    </div>
  )
}
