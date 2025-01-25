import { createElement } from 'react'
import { useModalStore } from 'store/modalStore'
import FullScreenModal from 'components/Modals/FullScreenModal'
import Modal from 'components/Modals/Modal'
import BottomSheet from 'components/Modals/BottomSheet'
import ConfirmModal from 'components/Modals/ConfirmModal'

export default function GlobalModal() {
    const { modals, closeModal } = useModalStore()
    const currentModal = modals[modals.length - 1]
    if (!currentModal) return null

    const modalTypes = {
        modal: Modal,
        fullScreen: FullScreenModal,
        confirm: ConfirmModal,
        bottomSheet: BottomSheet,
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
