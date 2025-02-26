import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const getGridPosition = (
    index: number,
    columns: number,
    spacing: number
): [number, number, number] => {
    const x = (index % columns) * spacing - ((columns - 1) * spacing) / 2
    const y = -Math.floor(index / columns) * spacing + 2
    return [x, y, 0]
}

// WebGL 컨텍스트 확인 컴포넌트
function WebGLCheck() {
    const { gl } = useThree()

    useEffect(() => {
        console.log('WebGLRenderer:', gl)
        if (!gl) {
            console.error('WebGLRenderer is not initialized correctly!')
        }
    }, [gl])

    return null
}

export { getGridPosition, WebGLCheck }
