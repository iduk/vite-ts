/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type modalType = 'confirm' | 'fullScreen' | 'bottomSheet' | 'modal'

interface IModalButton {
    label: string | JSX.Element
    action?: () => void
    style?: string
}

// 모달 구성
interface ModalConfig {
    type: modalType
    data?: any // 미정
    buttons: IModalButton[]
}

interface IModalState {
    modals: ModalConfig[] // 중첩 모달 배열
    openModal: (config: {
        type?: modalType | 'modal'
        onConfirm?: () => void
        onCancel?: () => void
        data?: any
    }) => void
    closeModal: () => void
}

export const useModalStore = create<IModalState>(set => ({
    modals: [],
    openModal: ({ type = 'modal', onConfirm, onCancel, data = null }) => {
        const newModal: ModalConfig = {
            type: type,
            buttons: [
                { label: '확인', action: onConfirm, style: 'primary' },
                { label: '취소', action: onCancel, style: 'secondary' },
            ],
            data,
        }
        set(state => ({ modals: [...state.modals, newModal] }))
    },
    closeModal: () => set(state => ({ modals: state.modals.slice(0, -1) })),
}))
