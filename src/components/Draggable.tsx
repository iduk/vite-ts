import { useEffect, useRef, useState } from 'react'
import { useGesture } from '@use-gesture/react'

const Draggable = () => {
    const [position, setPosition] = useState<[number, number]>([0, 0])
    const [scale, setScale] = useState(1)
    const boxRef = useRef<HTMLDivElement>(null)
    const boundsRef = useRef<HTMLDivElement>(null)
    const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 })

    const updateBounds = () => {
        if (boxRef.current && boundsRef.current) {
            const boundsRect = boundsRef.current.getBoundingClientRect()
            const rect = boxRef.current.getBoundingClientRect()

            setBounds({
                left: -(boundsRect.width / 2) + rect.width / 2,
                right: boundsRect.width / 2 - rect.width / 2,
                top: -(boundsRect.height / 2) + rect.height / 2,
                bottom: boundsRect.height / 2 - rect.height / 2,
            })
        }
    }

    const bind = useGesture(
        {
            onDrag: ({ movement: [x, y] }) => {
                const newX = Math.min(Math.max(x, bounds.left), bounds.right)
                const newY = Math.min(Math.max(y, bounds.top), bounds.bottom)
                setPosition([newX, newY])
            },
            onPinch: ({ offset: [d] }) => setScale(1 + d * 0.01),
        },
        {
            eventOptions: { passive: false },
        }
    )

    useEffect(() => {
        updateBounds()
        window.addEventListener('resize', updateBounds) // 화면 크기 변경 시
        return () => window.removeEventListener('resize', updateBounds)
    }, [])

    // useEffect(() => {
    //     console.log('position:', position)
    //     console.log('scale:', scale)
    // }, [position, scale])

    return (
        <section
            ref={boundsRef}
            className="relative bg-slate-50 w-full lg:w-[500px] h-[500px] grid place-items-center overflow-hidden touch-none" // *** touch-none 중복 터치스크롤 방지
        >
            <div
                ref={boxRef}
                {...bind()}
                style={{
                    transform: `translate(${position[0]}px, ${position[1]}px) scale(${scale})`,
                }}
                className="absolute grid place-items-center text-white w-32 h-32 rounded-full bg-[chocolate] cursor-pointer"
            >
                Touch! 🤚
            </div>
        </section>
    )
}

export default Draggable
