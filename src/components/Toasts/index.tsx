import Toast from 'components/Toasts/Toast'
import { useToastStore } from 'store/toastStore'
import styles from './Toast.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export interface ToastProps {
    title?: string
    message: string
    onConfirm?: () => void
    onCancel?: () => void
    isVisible: boolean
    toastTypes: string
}

export default function Toasts() {
    const { toasts } = useToastStore()

    const toastTypes = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
    }

    return (
        toasts.length > 0 && (
            <div className={cx('toast-container')}>
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        title={toast.title}
                        message={toast.message}
                        onConfirm={toast.buttons?.[0]?.action}
                        onCancel={toast.buttons?.[1]?.action}
                        toastTypes={toastTypes[toast.type || 'info']}
                        isVisible
                    />
                ))}
            </div>
        )
    )
}
