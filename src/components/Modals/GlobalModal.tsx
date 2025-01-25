import { createElement } from 'react'
import BottomSheetModal from 'components/Modals/BottomSheetModal'
import FullScreenModal from 'components/Modals/FullScreenModal'
import { useModalStore } from 'store/modalStore'
import Modal from 'components/Modals/Modal'

export default function GlobalModal() {
    const { modals, closeModal } = useModalStore()
    const currentModal = modals[modals.length - 1]
    if (!currentModal) return null

    // modal type 상수화

    const modalTypes = {
        modal: Modal,
        fullScreen: FullScreenModal,
        confirm: FullScreenModal,
        bottomSheet: BottomSheetModal,
    }

    return (
        // backdrop
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white border">
                {createElement(modalTypes[currentModal.type], {
                    title: currentModal.data?.title,
                    content: currentModal.data?.content,
                    onConfirm: currentModal.buttons[0].action,
                    onCancel: currentModal.buttons[1].action || closeModal,
                })}
            </div>
        </div>
    )
}
