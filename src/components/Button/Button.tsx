import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  color?: 'primary' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'outline' | 'fill'
  square?: boolean
  block?: boolean
  children?: React.ReactNode
  className?: string
}

export default function Button({
  color = 'primary',
  size = 'md',
  shape = 'fill',
  square = false,
  block = false,
  children,
  className = '',
}: ButtonProps) {
  const buttonClass = `
    ${styles.btn}
    ${styles[`btn-${color}`]} 
    ${styles[`btn-${size}`]} 
    ${styles[`btn-${shape}`]} 
    ${square ? styles['btn-square'] : ''}
    ${block ? styles['btn-block'] : ''}
    ${className}
  `
  return <button className={buttonClass}>{children}</button>
}
