import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { services } from '../data/services'
import Demo from './Demo'

const SCENES = ['sites-institucionais', 'sistemas-web', 'automacao-de-processos']
  .map(slug => services.find(item => item.slug === slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))

// Scrolltelling leve: um palco fixo (sticky) e três cenas que trocam conforme a rolagem.
// Sem canvas, sem 3D: um único listener de scroll (só enquanto a seção está na tela)
// e um setState apenas quando a cena muda.
export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let frame = 0
    let last = -1
    let visible = false

    const update = () => {
      const rect = element.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      if (bar.current) bar.current.style.transform = `scaleY(${progress})`
      const index = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length))
      if (index !== last) {
        last = index
        setActive(index)
      }
    }
    const onScroll = () => {
      if (!visible) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    let observer: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) update()
      })
      observer.observe(element)
    } else {
      visible = true
    }

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="na-pratica"
      className="story"
      style={{ '--n': SCENES.length } as CSSProperties}
      aria-label="Como a Aporte entrega"
    >
      <div className="story-stage">
        <div className="wrap story-grid">
          <div className="story-copy">
            <span className="kicker">na prática</span>
            <h2 className="story-title">
              Veja como <em>funciona.</em>
            </h2>

            <div className="story-scenes">
              {SCENES.map((service, index) => (
                <article
                  key={service.slug}
                  className={`story-scene${active === index ? ' is-active' : ''}`}
                  aria-hidden={active !== index}
                >
                  <span className="story-num">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                  <ul className="story-points">
                    {service.points.map(point => (
                      <li key={point}>
                        <Check size={16} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="btn btn-primary"
                    to={`/servicos/${service.slug}`}
                    tabIndex={active === index ? 0 : -1}
                  >
                    Saiba mais <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="story-visual glass" aria-hidden="true">
            <div className="story-visual-top">
              <span>{'// '}{String(active + 1).padStart(2, '0')}/{String(SCENES.length).padStart(2, '0')}</span>
              <span>{SCENES[active].stack}</span>
            </div>
            <div className="story-demos">
              {SCENES.map((service, index) => (
                <div key={service.slug} className={`story-demo${active === index ? ' is-active' : ''}`}>
                  <Demo kind={service.demo} />
                </div>
              ))}
            </div>
          </div>

          <div className="story-rail" aria-hidden="true">
            <span ref={bar} />
          </div>
        </div>
      </div>
    </section>
  )
}
