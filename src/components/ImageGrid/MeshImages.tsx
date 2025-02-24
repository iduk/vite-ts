import { useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Mesh } from 'three'

export default function MeshImages({
    url,
    position,
}: {
    url: string
    position: [number, number, number]
}) {
    const texture = useTexture(url)
    const meshRef = useRef<Mesh>(null)

    useEffect(() => {
        return () => {
            texture.dispose()
        }
    }, [texture])

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}
