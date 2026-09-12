import { Environment, Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function NotebookModel() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/notebook.glb')

  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x =
        (event.clientX / window.innerWidth) * 2 - 1

      mouse.current.y =
        -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame((state) => {
    if (!group.current) return

    const time = state.clock.getElapsedTime()

    /*
      Movimento baseado no mouse
    */

    const targetY = mouse.current.x * 0.22 - 0.35
    const targetX = -mouse.current.y * 0.10 - 0.08
    const targetZ = mouse.current.x * -0.025

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.045,
    )

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.045,
    )

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetZ,
      0.045,
    )

    /*
      Flutuação extremamente sutil
    */

    group.current.position.y =
      Math.sin(time * 0.7) * 0.045
  })

  return (
    <group
      ref={group}
      scale={2.5}
      position={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

export default function Notebook3D() {
  return (
    <div className="notebook-3d">
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 35,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Luz ambiente */}
        <ambientLight intensity={1.2} />

        {/* Luz principal */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={3}
        />

        {/* Luz de preenchimento */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={1.4}
        />

        {/* Iluminação de estúdio */}
        <Environment preset="studio" />

        <Float
          speed={0.8}
          rotationIntensity={0.03}
          floatIntensity={0.08}
        >
          <NotebookModel />
        </Float>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/notebook.glb')