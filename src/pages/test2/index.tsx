import { Canvas, useFrame } from '@react-three/fiber'
import { TrackballControls, useTexture } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { a, useSpring } from '@react-spring/three'

// 랜덤 배치
const getRandomPosition = (): [number, number, number] => {
    const range = 16
    return [
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
    ]
}

function ImagePlane({ url, position }: { url: string; position: [number, number, number] }) {
    const texture = useTexture(url)
    const [hovered, setHovered] = useState(false)

    const { pos } = useSpring({
        pos: position,
        from: { pos: [position[0] * 2, position[1] * 2, position[2] * 2] }, // 시작 위치를 멀리 둠
        config: { mass: 2, tension: 100, friction: 30 },
    })

    const { scale } = useSpring({
        scale: hovered ? 1.2 : 1,
        config: { tension: 300, friction: 10 },
    })

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        pos.set([
            position[0] + Math.sin(t + position[0]) * 0.2,
            position[1] + Math.cos(t + position[1]) * 0.2,
            position[2] + Math.sin(t * 0.5 + position[2]) * 0.1,
        ])
    })

    return (
        <a.mesh
            position={pos}
            scale={scale}
            rotation={[0, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial map={texture} />
        </a.mesh>
    )
}

// 3D 이미지 그리드
export default function ImageGrid() {
    const imageCount = 20 // 이미지 개수 증가
    const imageUrls = Array.from(
        { length: imageCount },
        (_, i) => `https://picsum.photos/seed/${i}/500/500`
    )

    return (
        <div className="fixed inset-0">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={1.5} />
                <Suspense fallback={null}>
                    {imageUrls.map((url, i) => (
                        <ImagePlane key={i} url={url} position={getRandomPosition()} />
                    ))}
                </Suspense>
                <TrackballControls
                    rotateSpeed={1} // 회전 속도
                    zoomSpeed={0.5}
                    panSpeed={0.5} // 이동 속도
                    dynamicDampingFactor={0.05} // 감속 효과
                    enabled
                />
            </Canvas>
        </div>
    )
}
