import { ToastProps } from 'components/Toasts'
import styles from './Toast.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export default function Toast({
    title,
    message,
    onConfirm,
    onCancel,
    toastTypes,
    id,
    className,
}: ToastProps) {
    return (
        <div id={id} data-type={toastTypes} className={className}>
            <div className={cx('toast-content')}>
                <h3>{title || '토스트 제목'}</h3>
                <p>{message || '토스트 메세지'}</p>
            </div>

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
