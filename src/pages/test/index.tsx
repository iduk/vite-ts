import { useModalStore } from 'store/modalStore'
import { useToastStore } from 'store/toastStore'

const TestIndex = () => {
    const { addModal } = useModalStore()
    const { addToast, hideToast } = useToastStore()

    const testModal1 = () => {
        addModal({
            type: 'bottomSheet',
            onConfirm: () => console.log('확인 클릭'),
            data: {
                title: '모달이에요',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores id, magnam unde temporibus sapiente praesentium voluptate nihil laborum a iusto culpa ullam architecto nisi adipisci nostrum dignissimos, quam quasi laboriosam?',
            },
        })
    }

    const testModal2 = () => {
        addModal({
            type: 'confirm',
            onConfirm: () => console.log('확인 클릭'),
            data: { title: '모달이에요', content: '이것은 모달입니다.' },
        })
    }

    const testModal3 = () => {
        addModal({
            type: 'fullScreen',
            onConfirm: () => console.log('확인 클릭'),
            data: { title: '모달이에요', content: '이것은 모달입니다.' },
        })
    }

    // 토스트 테스트
    const testToast1 = () => {
        addToast({
            type: 'info',
            message: '일반 토스트 타입 메세지...',
            onCancel: () => {
                console.log('취소 클릭')
                hideToast()
            },
        })
    }
    const testToast2 = () => {
        const duration = 5000
        addToast({
            type: 'success',
            duration: duration,
            message: `토스트 메세지입니다. ${duration / 1000}초 후 사라집니다.`,
            onConfirm: () => {
                console.log('확인 클릭')
                hideToast()
            },
            onCancel: () => {
                console.log('취소 클릭')
                hideToast()
            },
        })
    }

    return (
        <div className="flex flex-col gap-8 p-8">
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">모달</h2>
                <div className="flex gap-4">
                    <button className="px-3 py-2 border" onClick={testModal1}>
                        바텀시트 열기
                    </button>
                    <button className="px-3 py-2 border" onClick={testModal2}>
                        컨펌모달 열기
                    </button>
                    <button className="px-3 py-2 border" onClick={testModal3}>
                        풀스크린모달 열기
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">토스트</h2>
                <div className="flex gap-4">
                    <button className="px-3 py-2 border" onClick={testToast1}>
                        토스트1
                    </button>

                    <button className="px-3 py-2 border" onClick={testToast2}>
                        toast, duration 5s
                    </button>
                </div>
            </section>
        </div>
    )
}

export default TestIndex
