import { ToastProps } from 'components/Toasts'
import styles from './Toast.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export default function Toast({
    title,
    message,
    onConfirm,
    onCancel,
    isVisible,
    toastTypes,
}: ToastProps) {
    return (
        <div className={cx('toast', { hidden: !isVisible })} data-type={toastTypes}>
            <h3>{title || '토스트 제목'}</h3>
            <p>{message || '토스트 메세지'}</p>

            {/* 확인 또는 취소 버튼이 있는 경우에만 */}
            {(onConfirm || onCancel) && (
                <div className={cx('toast-buttons')}>
                    {onConfirm && <button onClick={onConfirm}>확인</button>}
                    {onCancel && <button onClick={onCancel}>취소</button>}
                </div>
            )}
        </div>
    )
}
