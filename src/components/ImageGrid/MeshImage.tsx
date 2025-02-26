import { useTexture } from '@react-three/drei'

// 🌟 이미지 컴포넌트
export default function MeshImage({
    url,
    position,
}: {
    url: string
    position: [number, number, number]
}) {
    const texture = useTexture(url)
    return (
        <mesh position={position} rotation={[0, 0, 0]}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}
