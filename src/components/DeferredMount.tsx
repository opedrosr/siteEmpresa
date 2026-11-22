import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

// Só monta o conteúdo pesado (ex.: 3D) quando o usuário chega perto dele.
export default function DeferredMount({ children, minHeight }: { children: ReactNode; minHeight: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || ready) return undefined
    if (!('IntersectionObserver' in window)) {
      setReady(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '700px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ready])

  return (
    <div ref={ref} className="deferred" style={{ minHeight: ready ? undefined : minHeight }}>
      {ready ? children : null}
    </div>
  )
}
