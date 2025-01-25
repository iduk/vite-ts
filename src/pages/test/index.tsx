import { useModalStore } from 'store/modalStore'

const TestIndex = () => {
    const { openModal } = useModalStore()

    const myCustomModal1 = () => {
        openModal({
            type: 'fullScreen',
            onConfirm: () => console.log('첫 번째 모달 확인 클릭'),
            data: { title: '모달이에요', content: '이것은 첫 번째 모달입니다.' },
        })
    }

    const myCustomModal2 = () => {
        openModal({
            type: 'confirm',
            onConfirm: () => console.log('두 번째 모달 확인 클릭'),
            data: { title: '컨펌모달', content: '이것은 두 번째 모달입니다.' },
        })
    }

    return (
        <div>
            <button onClick={myCustomModal1}>첫 번째 모달 열기</button>
            <button onClick={myCustomModal2}>두 번째 모달 열기</button>
        </div>
    )
}

export default TestIndex
