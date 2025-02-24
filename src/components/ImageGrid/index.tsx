import { Canvas } from '@react-three/fiber'
import MeshImages from 'components/ImageGrid/MeshImages'
import useImageUrl from 'components/ImageGrid/useImageUrl'
import { useEffect, useRef } from 'react'

export default function ImageGrid({
    columns = 4,
    imageCount = 4,
}: {
    columns?: number
    imageCount?: number
}) {
    const imageUrls = useImageUrl(imageCount)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const handleContextLost = (event: Event) => {
            event.preventDefault()
            console.warn('WebGL Context Lost. Trying to restore...')
        }

        const canvas = canvasRef?.current
        canvas?.addEventListener('webglcontextlost', handleContextLost)
    }, [])

    if (imageUrls.length === 0) {
        return <div className="w-full h-full flex items-center justify-center">Loading...</div>
    }

    return (
        <Canvas
            ref={canvasRef}
            orthographic
            camera={{ zoom: 20, position: [0, 0, 10] }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <ambientLight intensity={1} />
            {imageUrls.map((url, i) => {
                const x = (i % columns) * 1.2 - ((columns - 1) * 1.2) / 2
                const y = -Math.floor(i / columns) * 1.8 + 10
                return <MeshImages key={i} url={url} position={[x, y, 0]} />
            })}
        </Canvas>
    )
}
