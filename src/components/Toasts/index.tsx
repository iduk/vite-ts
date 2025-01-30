import Toast from 'components/Toasts/Toast'
import { useToastStore } from 'store/toastStore'
import styles from './Toast.module.scss'
import classnames from 'classnames/bind'
import { useEffect, useState } from 'react'
const cx = classnames.bind(styles)

export interface ToastProps {
    title?: string
    message: string
    onConfirm?: () => void
    onCancel?: () => void
    toastTypes: string
    id: string
    className?: string
}

export default function Toasts() {
    const { toasts, hideToast } = useToastStore()
    const [visible, setVisible] = useState<string[]>([])

    const toastTypes = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
    }

    const handleClose = (id: string) => {
        setVisible(prev => prev.filter(toastId => toastId !== id))
        setTimeout(() => {
            hideToast(id)
        }, 300)
    }

    useEffect(() => {
        toasts.forEach(toast => {
            if (!visible.includes(toast.id)) {
                setVisible(prev => [...prev, toast.id])

                setTimeout(() => {
                    setVisible(prev => prev.filter(toastId => toastId !== toast.id))

                    setTimeout(() => {
                        hideToast(toast.id)
                    }, 300)
                }, toast.duration - 300)
            }
        })
    }, [toasts])

    return (
        toasts.length > 0 && (
            <div className={cx('toast-container')}>
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        title={toast.title}
                        message={toast.message}
                        onConfirm={toast.buttons?.[0]?.action}
                        onCancel={toast.buttons?.[1]?.action || (() => handleClose(toast.id))}
                        toastTypes={toastTypes[toast.type || 'info']}
                        className={cx('toast', {
                            visible: visible.includes(toast.id),
                            exit: !visible.includes(toast.id),
                        })}
                    />
                ))}
            </div>
        )
    )
}
