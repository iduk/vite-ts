import { useState, ReactNode, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './Dialog.module.scss'
const cx = classNames.bind(styles)

interface DialogProps {
  type?: 'default' | 'bottomsheet'
  trigger: ReactNode
  children: ReactNode
  title?: string
  close?: boolean
}

export default function Dialog({
  type = 'default',
  trigger,
  children,
  title = '',
  close = true,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const openDialog = () => {
    setIsOpen(true)
    setTimeout(() => setIsAnimating(true), 10) // 애니메이션을 위한 지연
  }

  const closeDialog = () => {
    setIsAnimating(false)
    setTimeout(() => setIsOpen(false), 300) // 애니메이션 지속시간과 맞추기
  }

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false)
    }
  }, [isOpen])

  const shouldRenderHeader = title || close

  return (
    <>
      <div onClick={openDialog} className={cx('dialog-trigger')}>
        {trigger}
      </div>
      {isOpen && (
        <div className={cx('dialog-overlay', { open: isAnimating })} onClick={closeDialog}>
          <div
            className={cx('dialog', type, { open: isAnimating })}
            onClick={e => e.stopPropagation()}
          >
            {shouldRenderHeader && (
              <header className={cx('dialog-header')}>
                {title && <h2>{title}</h2>}
                {close && <button onClick={closeDialog}>닫기</button>}
              </header>
            )}
            <div className={cx('dialog-content')}>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
