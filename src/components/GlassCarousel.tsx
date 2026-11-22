import { Fragment, useEffect, useRef, useState } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import Ruler from './Ruler'
import './ServiceGlass.css'

// Carrossel de vidro reutilizável: painel de cor líquida + cards + régua.
// Serve para qualquer lista (artigos, projetos...): basta passar os itens e como desenhar cada card.
export default function GlassCarousel<T>({
  items,
  getKey,
  renderCard,
  label,
  ariaLabel,
  tone = 'warm',
}: {
  items: T[]
  getKey: (item: T) => string
  renderCard: (item: T, index: number, active: boolean) => ReactNode
  label: string
  ariaLabel: string
  tone?: 'warm' | 'rose'
}) {
  const [active, setActive] = useState(0)
  const [hintDone, setHintDone] = useState(false)
  const [dragging, setDragging] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const drag = useRef({ startX: 0, startLeft: 0, moved: false })
  const last = items.length - 1

  const scrollTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[Math.max(0, Math.min(index, last))] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior })
  }

  const nearest = () => {
    const track = trackRef.current
    if (!track) return 0
    let best = 0
    let bestDistance = Infinity
    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLElement
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - (track.scrollLeft + track.clientWidth / 2))
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })
    return best
  }

  const handleScroll = () => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      setActive(nearest())
      if (track.scrollLeft > 12) setHintDone(true)
    })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const track = trackRef.current
    if (!track) return
    drag.current = { startX: event.clientX, startLeft: track.scrollLeft, moved: false }
    setDragging(true)
  }

  // Depois de arrastar com o mouse, o clique que "sobra" não deve abrir links.
  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollTo(Math.min(active + 1, last))
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollTo(Math.max(active - 1, 0))
    }
  }

  useEffect(() => {
    if (!dragging) return undefined

    const handleMove = (event: PointerEvent) => {
      const track = trackRef.current
      if (!track) return
      const dx = event.clientX - drag.current.startX
      if (Math.abs(dx) > 5) drag.current.moved = true
      track.scrollLeft = drag.current.startLeft - dx
    }
    const handleUp = () => {
      setDragging(false)
      scrollTo(nearest())
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  if (items.length === 0) return null

  return (
    <div className="carousel sg-carousel">
      <div className="wrap carousel-top">
        <p className={`swipe-hint${hintDone ? ' is-done' : ''}`} aria-hidden="true">
          Arraste para o lado
          <span className="swipe-arrows" aria-hidden="true">
            <ChevronRight size={16} />
            <ChevronRight size={16} />
            <ChevronRight size={16} />
          </span>
        </p>
        <div className="carousel-arrows">
          <button
            type="button"
            className="arrow-btn"
            aria-label="Anterior"
            disabled={active === 0}
            onClick={() => scrollTo(active - 1)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="arrow-btn"
            aria-label="Próximo"
            disabled={active === last}
            onClick={() => scrollTo(active + 1)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`sg-stage${tone === 'rose' ? ' is-rose' : ''}`}>
        <div className="sg-bg" aria-hidden="true">
          <span className="sg-blob sg-b1" />
          <span className="sg-blob sg-b2" />
          <span className="sg-blob sg-b3" />
          <span className="sg-blob sg-b4" />
        </div>

        <div
          ref={trackRef}
          className={`carousel-track${dragging ? ' is-dragging' : ''}`}
          role="region"
          aria-roledescription="carrossel"
          aria-label={ariaLabel}
          data-cursor="arraste"
          tabIndex={0}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onClickCapture={handleClickCapture}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <Fragment key={getKey(item)}>{renderCard(item, index, active === index)}</Fragment>
          ))}
        </div>

        <Ruler
          tone="glass"
          count={items.length}
          active={active}
          onSelect={index => scrollTo(index)}
          label={label}
          ariaLabel={`Escolher: ${label}`}
        />
      </div>
    </div>
  )
}