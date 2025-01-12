import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GUI } from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const MorphTargets: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        let renderer: THREE.WebGLRenderer
        let camera: THREE.PerspectiveCamera
        let scene: THREE.Scene
        let mesh: THREE.Mesh
        let controls: OrbitControls

        const init = () => {
            // Container
            const container = containerRef.current!

            // Scene
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0x8fbcde)

            // Camera
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20)
            camera.position.z = 10
            scene.add(camera)

            // Lights
            scene.add(new THREE.AmbientLight(0x8fbcde, 1.5))
            const pointLight = new THREE.PointLight(0xffffff, 200)
            camera.add(pointLight)

            // Geometry and Material
            const geometry = createGeometry()
            const material = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                flatShading: true,
            })

            // Mesh
            mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setAnimationLoop(() => renderer.render(scene, camera))
            container.appendChild(renderer.domElement)

            // Controls
            controls = new OrbitControls(camera, renderer.domElement)
            controls.enableZoom = false

            // GUI
            initGUI()

            // Resize
            window.addEventListener('resize', onWindowResize)
        }

        const createGeometry = (): THREE.BufferGeometry => {
            const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32)

            // Create morph targets
            geometry.morphAttributes.position = []

            const positionAttribute = geometry.attributes.position

            const spherePositions: number[] = []
            const twistPositions: number[] = []
            const direction = new THREE.Vector3(1, 0, 0)
            const vertex = new THREE.Vector3()

            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i)
                const y = positionAttribute.getY(i)
                const z = positionAttribute.getZ(i)

                spherePositions.push(
                    x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
                    y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
                    z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3)
                )

                vertex.set(x * 2, y, z)
                vertex
                    .applyAxisAngle(direction, (Math.PI * x) / 2)
                    .toArray(twistPositions, twistPositions.length)
            }

            geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
                spherePositions,
                3
            )
            geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(
                twistPositions,
                3
            )

            return geometry
        }

        const initGUI = () => {
            const params = { Spherify: 0, Twist: 0 }
            const gui = new GUI({ title: 'Morph Targets' })

            gui.add(params, 'Spherify', 0, 1, 0.01).onChange((value: number) => {
                mesh.morphTargetInfluences![0] = value
            })
            gui.add(params, 'Twist', 0, 1, 0.01).onChange((value: number) => {
                mesh.morphTargetInfluences![1] = value
            })
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        init()

        // Cleanup
        return () => {
            window.removeEventListener('resize', onWindowResize)
            renderer.dispose()
        }
    }, [])

    return <div ref={containerRef} />
}

export default MorphTargets
