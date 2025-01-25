import { ModalProps } from 'components/Modals'
import styles from './Modal.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export default function Modal({ title, content, onConfirm, onCancel, isVisible }: ModalProps) {
    return (
        <div className={cx('modal-container', isVisible ? 'in' : 'out')}>
            <h3>{title || '모달 제목'}</h3>
            <p>{content || '모달 내용'}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    )
}
