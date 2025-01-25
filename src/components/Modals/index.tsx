import { createElement, useEffect, useState } from 'react'
import FullScreenModal from 'components/Modals/FullScreenModal'
import Modal from 'components/Modals/Modal'
import BottomSheet from 'components/Modals/BottomSheet'
import ConfirmModal from 'components/Modals/ConfirmModal'
import { useModalStore } from 'store/modalStore'

export interface ModalProps {
    title?: string
    content?: string
    onConfirm?: () => void
    onCancel?: () => void
    isVisible: boolean
}

export default function Modals() {
    const { modals, closeModal } = useModalStore()
    const [isVisible, setIsVisible] = useState(false)

    const currentModal = modals[modals.length - 1]

    useEffect(() => {
        if (currentModal) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [currentModal])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            closeModal()
        }, 300)
    }

    if (!currentModal) return null

    const modalTypes = {
        modal: Modal,
        fullScreen: FullScreenModal,
        confirm: ConfirmModal,
        bottomSheet: BottomSheet,
    }

    return (
        <div
            className={`z-10 fixed inset-0 flex items-center justify-center bg-black/50  transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onKeyDown={e => e.key === 'Escape' && handleClose()}
        >
            {createElement(modalTypes[currentModal.type], {
                title: currentModal.data?.title,
                content: currentModal.data?.content,
                onConfirm: currentModal.buttons[0].action,
                onCancel: currentModal.buttons[1].action || handleClose,
                isVisible: isVisible,
            })}
        </div>
    )
}
