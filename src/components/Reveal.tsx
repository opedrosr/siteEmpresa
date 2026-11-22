import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Entrada suave de um bloco quando ele aparece na tela.
export default function Reveal({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`scroll-reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
