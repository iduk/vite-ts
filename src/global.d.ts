declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, MOUSE, Vector3 } from 'three'

    export class OrbitControls extends EventDispatcher {
        enableZoom: boolean
        constructor(object: Camera, domElement?: HTMLElement)

        object: Camera
        domElement: HTMLElement | undefined

        // API
        enabled: boolean
        target: Vector3

        // Controls
        update(): void
        dispose(): void

        // Mouse buttons
        mouseButtons: {
            LEFT: MOUSE
            MIDDLE: MOUSE
            RIGHT: MOUSE
        }
    }
}
