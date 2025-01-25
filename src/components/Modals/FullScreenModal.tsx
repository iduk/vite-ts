interface ModalProps {
    title?: string
    content?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export default function FullScreenModal({ title, content, onConfirm, onCancel }: ModalProps) {
    return (
        <div className="p-8 rounded-lg">
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
