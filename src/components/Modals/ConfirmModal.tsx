interface ModalProps {
    title?: string
    content?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export default function ConfirmModal({ title, content, onConfirm, onCancel }: ModalProps) {
    return (
        // tailwindcss Confirm UI max-w-sm
        <div className="modal max-w-sm">
            {title && <h3>{title}</h3>}
            <p>{content || '모달 내용'}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    )
}
