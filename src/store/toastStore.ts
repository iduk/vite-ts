import { create } from 'zustand'

type toastType = 'success' | 'error' | 'info'

interface IToastButton {
    label: string | JSX.Element
    action?: () => void
    style?: string
}

interface ToastConfig {
    id: string
    type: toastType
    title?: string
    message: string
    buttons: IToastButton[]
}

interface IToastState {
    toasts: ToastConfig[]

    addToast: (config: {
        type?: toastType | 'info'
        onConfirm?: () => void
        onCancel?: () => void
        title?: string
        message: string
    }) => void
    hideToast: (id: string) => void
}

export const useToastStore = create<IToastState>((set, get) => ({
    toasts: [],
    addToast: ({ type = 'info', onConfirm, onCancel, title, message }) => {
        const newToast: ToastConfig = {
            id: `toast-${Date.now()}`,
            type,
            title,
            message,
            buttons: [
                { label: '확인', action: onConfirm, style: 'primary' },
                { label: '취소', action: onCancel, style: 'secondary' },
            ],
        }
        set(state => ({ toasts: [...state.toasts, newToast] }))
        setTimeout(() => get().hideToast(newToast.id), 2500)
    },
    hideToast: id => {
        set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) }))
    },
}))
