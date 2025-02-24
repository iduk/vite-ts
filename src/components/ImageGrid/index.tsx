import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MeshImage from './MeshImage'
import useImageUrl from './useImageUrl'

export default function ImageGrid({ imageCount = 10 }) {
    const imageUrls = useImageUrl(imageCount)

    if (!imageUrls.length) {
        return <div className="w-full h-full flex items-center justify-center">Loading...</div>
    }

    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ preserveDrawingBuffer: false }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            {imageUrls.map((url, i) => {
                const angle = (i / imageCount) * Math.PI * 2 // 원형 배치
                const x = Math.cos(angle) * 8
                const y = Math.sin(angle) * 5
                const z = (Math.random() - 0.5) * 5
                return <MeshImage key={i} url={url} position={[x, y, z]} />
            })}
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}
