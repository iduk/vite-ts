import { create } from 'zustand'

type toastType = 'success' | 'error' | 'info'

interface IToastButton {
    label: string | React.ReactNode
    action?: () => void
    style?: string
}

interface ToastConfig {
    id: string
    type?: toastType
    title?: string
    message: string
    buttons: IToastButton[]
    duration: number
}

interface IToastState {
    toasts: ToastConfig[]
    toastId: number
    addToast: (config: {
        type?: toastType | 'info'
        onConfirm?: () => void
        onCancel?: () => void
        title?: string
        message: string
        duration?: number
    }) => void
    hideToast: (id?: string) => void
}

export const useToastStore = create<IToastState>(set => ({
    toasts: [],
    toastId: 0,
    addToast: ({ type = 'info', onConfirm, onCancel, title, message, duration = 5000 }) => {
        const toastId = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        const newToast: ToastConfig = {
            id: toastId,
            type,
            title,
            message,
            buttons: [
                { label: '확인', action: onConfirm, style: '' },
                { label: '취소', action: onCancel, style: '' },
            ],
            duration,
        }

        set(state => ({
            toasts: [...state.toasts, newToast],
        }))

        setTimeout(() => {
            set(state => ({
                toasts: state.toasts.filter(toast => toast.id !== toastId),
            }))
        }, duration)
    },
    hideToast: id => {
        set(state => ({
            toasts: id ? state.toasts.filter(toast => toast.id !== id) : state.toasts.slice(0, -1),
        }))
    },
}))
