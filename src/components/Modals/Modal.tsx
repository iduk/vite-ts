interface ModalProps {
    title?: string
    content?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export default function Modal({ title, content, onConfirm, onCancel }: ModalProps) {
    return (
        <div className={`modal`}>
            <h3>{title || '모달 제목'}</h3>
            <p>{content || '모달 내용'}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    )
}
