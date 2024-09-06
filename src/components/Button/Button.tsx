import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

interface ButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary'
  square?: boolean
  outline?: boolean
  block?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

export default function Button({
  size = 'md',
  color = 'primary',
  square = false,
  outline = false,
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const classes = cx('btn', {
    [`btn-${size}`]: size,
    [`btn-${color}`]: color,
    'btn-square': square,
    'btn-outline': outline,
    'btn-block': block,
  })

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
