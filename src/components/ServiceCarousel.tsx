import { useEffect, useRef, useState } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { services } from '../data/services'
import Ruler from './Ruler'
import ServiceCard from './ServiceCard'

export default function ServiceCarousel() {
  const [activeService, setActiveService] = useState(0)
  const [dragging, setDragging] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const trackFrame = useRef(0)
  const drag = useRef({ startX: 0, startLeft: 0, moved: false })

  const scrollToService = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[Math.max(0, Math.min(index, services.length - 1))] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior })
  }

  const nearestService = () => {
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

  const handleTrackScroll = () => {
    cancelAnimationFrame(trackFrame.current)
    trackFrame.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      setActiveService(nearestService())
    })
  }

  const handleTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const track = trackRef.current
    if (!track) return
    drag.current = { startX: event.clientX, startLeft: track.scrollLeft, moved: false }
    setDragging(true)
  }

  // Depois de arrastar com o mouse, o clique que "sobra" não deve abrir links.
  const handleTrackClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }

  const handleTrackKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToService(Math.min(activeService + 1, services.length - 1))
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToService(Math.max(activeService - 1, 0))
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
      scrollToService(nearestService())
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

  useEffect(() => () => cancelAnimationFrame(trackFrame.current), [])

  return (
    <div className="carousel">
      <div className="wrap carousel-top">
        <div className="carousel-arrows">
          <button
            type="button"
            className="arrow-btn"
            aria-label="Serviço anterior"
            disabled={activeService === 0}
            onClick={() => scrollToService(activeService - 1)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="arrow-btn"
            aria-label="Próximo serviço"
            disabled={activeService === services.length - 1}
            onClick={() => scrollToService(activeService + 1)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`carousel-track${dragging ? ' is-dragging' : ''}`}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Serviços da Aporte"
        data-cursor="arraste"
        tabIndex={0}
        onScroll={handleTrackScroll}
        onPointerDown={handleTrackPointerDown}
        onClickCapture={handleTrackClickCapture}
        onKeyDown={handleTrackKeyDown}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index}
            total={services.length}
            active={activeService === index}
            offset={index - activeService}
          />
        ))}
      </div>

      <Ruler
        count={services.length}
        active={activeService}
        onSelect={index => scrollToService(index)}
        label="Serviços"
        ariaLabel="Escolher serviço"
      />
    </div>
  )
}