import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type AccessKey = 'systems' | 'automation' | 'web' | 'data'

const accesses: Array<{
  id: AccessKey
  label: string
  index: string
  title: string
  text: string
}> = [
  {
    id: 'systems',
    label: 'SISTEMAS',
    index: '01',
    title: 'Sistemas sob medida',
    text: 'Ferramentas digitais construídas para organizar processos e tornar a operação mais eficiente.',
  },
  {
    id: 'automation',
    label: 'AUTOMAÇÃO',
    index: '02',
    title: 'Fluxos inteligentes',
    text: 'Conectamos tarefas, dados e ferramentas para reduzir trabalho manual e acelerar a operação.',
  },
  {
    id: 'web',
    label: 'WEB',
    index: '03',
    title: 'Experiências digitais',
    text: 'Sites e interfaces pensados para posicionar a empresa e transformar atenção em oportunidade.',
  },
  {
    id: 'data',
    label: 'DADOS',
    index: '04',
    title: 'Informação organizada',
    text: 'Estruturas que deixam informações mais acessíveis, conectadas e úteis para decisões melhores.',
  },
]

function NotebookModel({ active }: { active: AccessKey | null }) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/notebook.glb')

  const model = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z)

    clone.position.sub(center)
    clone.scale.setScalar(3.15 / maxDimension)

    return clone
  }, [scene])

  useFrame((_, delta) => {
    if (!group.current) return

    const targetY = active ? 0.18 : -0.18
    const targetX = active ? -0.08 : 0.04
    const targetZ = active ? 0.04 : 0
    const targetScale = active ? 1.04 : 1

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.2, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.2, delta)
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetZ, 3.2, delta)
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-4 * delta))
  })

  return <primitive ref={group} object={model} />
}

function Scene({ active }: { active: AccessKey | null }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 5, 6]} intensity={3.2} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <pointLight position={[0, 2, 2]} intensity={active ? 2.2 : 1.2} color="#ff4b16" />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <NotebookModel active={active} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.75}
        dampingFactor={0.08}
        enableDamping
        minPolarAngle={Math.PI * 0.30}
        maxPolarAngle={Math.PI * 0.70}
      />
      <Html
        position={[0, -1.55, 0]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div className="model-status">APORTE / DIGITAL CORE</div>
      </Html>
    </>
  )
}

export default function Notebook3D() {
  const [active, setActive] = useState<AccessKey | null>(null)
  const activeAccess = accesses.find(item => item.id === active) ?? null

  return (
    <section className="interactive-3d-section" aria-label="Explore a Aporte">
      <div className="interactive-3d-head">
        <div>
          <span className="interactive-kicker">02 / EXPLORE</span>
          <h2>Veja como<br /><em>pensamos.</em></h2>
        </div>
        <p>Toque nos acessos ou arraste o modelo para explorar a Aporte.</p>
      </div>

      <div className={`interactive-3d-stage ${active ? 'has-active' : ''}`}>
        <div className="interactive-3d-grid" />
        <div className="interactive-3d-orbit orbit-a" />
        <div className="interactive-3d-orbit orbit-b" />

        <div className="interactive-3d-canvas">
          <Canvas
            camera={{ position: [0, 0.45, 5.1], fov: 31 }}
            dpr={[1, 1.35]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <Scene active={active} />
          </Canvas>
        </div>

        <div className="touch-hint">
          <span className="touch-hint-icon">↔</span>
          <span>ARRASTE PARA GIRAR</span>
        </div>

        <div className="access-list" aria-label="Acessos">
          {accesses.map(access => (
            <button
              key={access.id}
              type="button"
              className={`access-button ${active === access.id ? 'is-active' : ''}`}
              onClick={() => setActive(current => current === access.id ? null : access.id)}
              aria-expanded={active === access.id}
            >
              <span className="access-index">{access.index}</span>
              <span>{access.label}</span>
              <span className="access-arrow">↗</span>
            </button>
          ))}
        </div>

        {activeAccess && (
          <div className="access-detail" role="dialog" aria-label={activeAccess.title}>
            <div className="access-detail-top">
              <span>{activeAccess.index} / {activeAccess.label}</span>
              <button type="button" onClick={() => setActive(null)} aria-label="Fechar">×</button>
            </div>
            <h3>{activeAccess.title}</h3>
            <p>{activeAccess.text}</p>
            <a href="#consultar" onClick={() => setActive(null)}>Conversar sobre um projeto ↗</a>
          </div>
        )}

      </div>
    </section>
  )
}

useGLTF.preload('/notebook.glb')
