import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const ThreeText: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Renderer 초기화
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        })

        renderer.setSize(window.innerWidth, window.innerHeight)

        // Scene, Camera 생성
        const scene = new THREE.Scene()

        const fov = 75
        const aspect = window.innerWidth / window.innerHeight
        const near = 0.1
        const far = 100
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.z = 3

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(0, 0, 0)
        controls.update()

        // Directional Light
        {
            const light = new THREE.DirectionalLight(0xffffff, 3)
            light.position.set(-1, 2, 4)
            scene.add(light)
        }

        // 큐브 생성 함수
        const geometry = new THREE.BoxGeometry(1, 1, 1)

        function makeInstance(geometry: THREE.BoxGeometry, color: number, x: number) {
            const material = new THREE.MeshPhongMaterial({ color })
            const cube = new THREE.Mesh(geometry, material)
            scene.add(cube)
            cube.position.x = x
            return cube
        }

        const cubes = [
            makeInstance(geometry, 0x44aa88, 0),
            makeInstance(geometry, 0x8844aa, -2),
            makeInstance(geometry, 0xaa8844, 2),
        ]

        // 배경 텍스처 추가
        {
            const loader = new THREE.CubeTextureLoader()
            const texture = loader.load([
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
                'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
            ])
            scene.background = texture
        }

        // 렌더링 크기 조정 함수
        function resizeRendererToDisplaySize() {
            const canvas = renderer.domElement
            const width = window.innerWidth
            const height = window.innerHeight
            const needResize = canvas.width !== width || canvas.height !== height
            if (needResize) {
                renderer.setSize(width, height, false)
                camera.aspect = width / height
                camera.updateProjectionMatrix()
            }
        }

        // 렌더링 루프
        function render(time: number) {
            time *= 0.001 // 밀리초 -> 초

            resizeRendererToDisplaySize()

            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * 0.1
                const rot = time * speed
                cube.rotation.x = rot
                cube.rotation.y = rot
            })

            renderer.render(scene, camera)

            requestAnimationFrame(render)
        }

        requestAnimationFrame(render)

        // 이벤트 리스너 추가
        const handleResize = () => resizeRendererToDisplaySize()
        window.addEventListener('resize', handleResize)

        // 컴포넌트 언마운트 시 정리
        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} />
}

export default ThreeText
