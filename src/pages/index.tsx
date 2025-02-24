import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Suspense, useEffect } from 'react'

const getGridPosition = (
    index: number,
    columns: number,
    spacing: number
): [number, number, number] => {
    const x = (index % columns) * spacing - ((columns - 1) * spacing) / 2
    const y = -Math.floor(index / columns) * spacing + 5
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

// 🌟 이미지 컴포넌트
function ImagePlane({ url, position }: { url: string; position: [number, number, number] }) {
    const texture = useTexture(url)
    return (
        <mesh position={position} rotation={[0, 0, 0]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

// 그리드 레이아웃
export default function ImageGrid() {
    const imageCount = 16
    const columns = 4
    const spacing = 2.5

    const imageUrls = Array.from(
        { length: imageCount },
        (_, i) => `https://picsum.photos/seed/${i}/500/500`
    )

    return (
        <div className="fixed inset-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <WebGLCheck />
                <ambientLight intensity={1.5} />
                <Suspense fallback={null}>
                    {imageUrls.map((url, i) => (
                        <ImagePlane
                            key={i}
                            url={url}
                            position={getGridPosition(i, columns, spacing)}
                        />
                    ))}
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    )
}
