import { ModalProps } from 'components/Modals'
import styles from './FullScreenModal.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export default function FullScreenModal({
    title,
    content,
    onConfirm,
    onCancel,
    isVisible,
}: ModalProps) {
    return (
        <div className={cx('modal-container', isVisible ? 'in' : 'out')}>
            <h3>{title || '모달 제목'}</h3>
            <p>{content || '모달 내용'}</p>
            <div className="flex justify-end mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                    onClick={onConfirm}
                >
                    확인
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    )
}
