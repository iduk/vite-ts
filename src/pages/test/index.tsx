import { useModalStore } from 'store/modalStore'

const TestIndex = () => {
    const { openModal } = useModalStore()

    const myCustomModal1 = () => {
        openModal({
            type: 'bottomSheet',
            onConfirm: () => console.log('확인 클릭'),
            data: {
                title: '모달이에요',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores id, magnam unde temporibus sapiente praesentium voluptate nihil laborum a iusto culpa ullam architecto nisi adipisci nostrum dignissimos, quam quasi laboriosam?',
            },
        })
    }

    const myCustomModal2 = () => {
        openModal({
            type: 'confirm',
            onConfirm: () => console.log('확인 클릭'),
            data: { title: '모달이에요', content: '이것은 모달입니다.' },
        })
    }

    const myCustomModal3 = () => {
        openModal({
            type: 'fullScreen',
            onConfirm: () => console.log('확인 클릭'),
            data: { title: '모달이에요', content: '이것은 모달입니다.' },
        })
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 h-screen">
            <button className="px-3 py-2 border" onClick={myCustomModal1}>
                바텀시트 열기
            </button>
            <button className="px-3 py-2 border" onClick={myCustomModal2}>
                컨펌모달 열기
            </button>
            <button className="px-3 py-2 border" onClick={myCustomModal3}>
                풀스크린모달 열기
            </button>
        </div>
    )
}

export default TestIndex
