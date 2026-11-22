import { useEffect } from 'react'
import type { RefObject } from 'react'

// Cursor personalizado e botões magnéticos (só mouse; desligado com "reduzir movimento").
export function useCustomCursor(
  dotRef: RefObject<HTMLDivElement | null>,
  ringRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dot = dotRef.current
    const ring = ringRef.current
    if (!fine || reduce || !dot || !ring) return undefined

    document.documentElement.classList.add('has-cursor')
    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let magnet: HTMLElement | null = null
    let center = { x: 0, y: 0 }

    const loop = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      document.documentElement.classList.add('cursor-on')
      if (magnet) {
        magnet.style.transform = `translate(${(x - center.x) * 0.18}px, ${(y - center.y) * 0.28}px)`
      }
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target || !target.closest) return
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      const text = target.closest('input, textarea')
      const link = target.closest('a, button, summary, [role="tab"], label')
      ring.dataset.state = labelled ? 'label' : text ? 'text' : link ? 'link' : ''
      ring.dataset.label = labelled?.dataset.cursor ?? ''

      const next = target.closest<HTMLElement>('[data-magnetic]')
      if (next !== magnet) {
        if (magnet) magnet.style.transform = ''
        magnet = next
        if (next) {
          const rect = next.getBoundingClientRect()
          center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        }
      }
    }

    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    const onLeave = () => document.documentElement.classList.remove('cursor-on')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-cursor', 'cursor-on')
      if (magnet) magnet.style.transform = ''
    }
  }, [dotRef, ringRef])
}
