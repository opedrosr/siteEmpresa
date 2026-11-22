import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, TouchEvent } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

import type { Project } from '../data/projects'
import WhatsAppLink from './WhatsAppLink'

// Galeria + informações de um projeto. Use key={project.slug} para reiniciar ao trocar de projeto.
export default function ProjectViewer({ project }: { project: Project }) {
  const [activeGallery, setActiveGallery] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const galleryTotal = project.gallery.length
  const current = project.gallery[activeGallery]

  const goToImage = (index: number) => setActiveGallery((index + galleryTotal) % galleryTotal)

  // Mantém a miniatura ativa visível, sem mexer na rolagem da página.
  useEffect(() => {
    const row = galleryRef.current
    const button = row?.children[activeGallery] as HTMLElement | undefined
    if (!row || !button) return
    row.scrollTo({ left: button.offsetLeft - (row.clientWidth - button.clientWidth) / 2, behavior: 'smooth' })
  }, [activeGallery])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) goToImage(activeGallery + (dx < 0 ? 1 : -1))
  }

  // Inclinação 3D da moldura (só mouse).
  const handleTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--ry', `${px * 9}deg`)
    element.style.setProperty('--rx', `${-py * 7}deg`)
  }

  const resetTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--ry', '0deg')
    event.currentTarget.style.setProperty('--rx', '0deg')
  }

  return (
    <div className="proj">
      <div className="proj-ghost" aria-hidden="true">{project.id}</div>

      <div className="proj-stage">
        <div className="frame" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
          <div className="frame-inner">
            <div className="frame-top">
              <span>{`FIG. ${String(activeGallery + 1).padStart(2, '0')}/${String(galleryTotal).padStart(2, '0')}`}</span>
              <span>{project.type}</span>
            </div>
            <div className="shot" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <img key={current.src} src={current.src} alt={current.alt} loading="lazy" decoding="async" />
              <button type="button" className="shot-nav shot-prev" aria-label="Tela anterior" onClick={() => goToImage(activeGallery - 1)}>
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" className="shot-nav shot-next" aria-label="Próxima tela" onClick={() => goToImage(activeGallery + 1)}>
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="shot-progress" aria-hidden="true">
              <span style={{ width: `${((activeGallery + 1) / galleryTotal) * 100}%` }} />
            </div>
          </div>
          <i className="mark tl" aria-hidden="true" />
          <i className="mark tr" aria-hidden="true" />
          <i className="mark bl" aria-hidden="true" />
          <i className="mark br" aria-hidden="true" />
        </div>

        <div className="thumbs" ref={galleryRef} aria-label="Telas do projeto">
          {project.gallery.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className={activeGallery === index ? 'is-active' : ''}
              onClick={() => setActiveGallery(index)}
              aria-label={`Ver tela ${index + 1}`}
              aria-current={activeGallery === index ? 'true' : undefined}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>

        <p className="shot-hint">
          <span className="hint-touch">Deslize a imagem ou toque nas miniaturas para ver mais telas.</span>
          <span className="hint-pointer">Use as setas ou as miniaturas para ver mais telas.</span>
        </p>
      </div>

      <div className="proj-info">
        <span className="project-type">{`// projeto ${project.id} · ${project.type}`}</span>
        <h2>Sobre o projeto</h2>
        <p>{project.description}</p>

        <ul className="tag-list" aria-label="Tecnologias e áreas">
          {project.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-video">
          <span>Veja funcionando</span>
          <video src={project.video} poster={project.image} controls playsInline preload="none" />
        </div>

        <WhatsAppLink
          className="btn btn-primary btn-block"
          message={`Olá! Vi o projeto "${project.name}" no site da Aporte e quero conversar sobre algo parecido.`}
        >
          Quero algo parecido <ArrowUpRight size={18} aria-hidden="true" />
        </WhatsAppLink>
      </div>
    </div>
  )
}
