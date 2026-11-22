import { useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'

const pad = (n: number) => String(n).padStart(2, '0')

// Régua de navegação (como a linha do tempo da referência): um pino que corre pelas marcas.
// Serve para qualquer carrossel: basta passar a quantidade, o item ativo e o que fazer ao escolher.
export default function Ruler({
  count,
  active,
  onSelect,
  label,
  ariaLabel,
  tone,
}: {
  count: number
  active: number
  onSelect: (index: number) => void
  label: string
  ariaLabel: string
  tone?: 'light' | 'glass'
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const last = useRef(active)

  const steps = Math.max(count - 1, 1)
  const tickCount = steps * 4 + 1
  const left = (active / steps) * 100

  const indexFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return active
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    return Math.round(ratio * steps)
  }

  const choose = (index: number) => {
    if (index === last.current) return
    last.current = index
    onSelect(index)
  }

  const handleDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    last.current = -1
    choose(indexFromPointer(event))
  }
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) choose(indexFromPointer(event))
  }
  const handleUp = () => {
    dragging.current = false
  }
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onSelect(Math.min(active + 1, count - 1))
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onSelect(Math.max(active - 1, 0))
    }
  }

  return (
    <div className={`ruler${tone === 'glass' ? ' is-glass' : ''}`}>
      <div className="ruler-top">
        <span>{label}</span>
        <b>
          {pad(active + 1)} / {pad(count)}
        </b>
      </div>
      <div
        ref={trackRef}
        className="ruler-track"
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={active + 1}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onKeyDown={handleKey}
      >
        <div className="ruler-ticks" aria-hidden="true">
          {Array.from({ length: tickCount }, (_, i) => (
            <i key={i} className={i % 4 === 0 ? 'is-major' : undefined} />
          ))}
        </div>
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`ruler-num${i === active ? ' is-active' : ''}`}
            style={{ left: `${(i / steps) * 100}%` }}
            aria-hidden="true"
          >
            {pad(i + 1)}
          </span>
        ))}
        <span className="ruler-pin" style={{ left: `${left}%` }} aria-hidden="true" />
      </div>
    </div>
  )
}