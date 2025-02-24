import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

export default function MeshImage({
    url,
    position,
}: {
    url: string
    position: [number, number, number]
}) {
    const texture = useTexture(url)
    const meshRef = useRef<Mesh>(null)

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={[Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5]}
        >
            <planeGeometry args={[4, 4]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}
