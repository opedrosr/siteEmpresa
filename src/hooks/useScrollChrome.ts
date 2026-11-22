import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

// Barra de progresso, header que some ao rolar para baixo e botão fixo de WhatsApp.
// Tudo no mesmo listener de scroll, sem re-renderizar a página inteira.
export function useScrollChrome(progressRef: RefObject<HTMLDivElement | null>, pathname: string) {
  const [headerHidden, setHeaderHidden] = useState(false)
  const [pastTop, setPastTop] = useState(false)

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY

    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(y / max, 1) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`

      const delta = y - lastY
      if (Math.abs(delta) > 6) {
        setHeaderHidden(delta > 0 && y > 120)
        lastY = y
      }

      // Na home, o botão aparece depois que o Hero (id="inicio") sai da tela.
      const hero = document.getElementById('inicio')
      setPastTop(hero ? hero.getBoundingClientRect().bottom < 0 : y > 600)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname, progressRef])

  return { headerHidden, pastTop }
}
