import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SITE } from '../data/site'
import './Hero.css'

// Início minimalista: fundo branco e o nome "aporte" desenhado em traço, com um filtro "líquido":
// as letras se mexem devagar e, quando se aproximam, se ligam por pontes de tinta (como no logo da referência).
// Contém o <h1> da home.

const STROKE = 34
const R = 64
const GAP = 16

type Letter = {
  key: string
  width: number
  paths: string[]
  circle?: boolean
  move: { x: number; y: number; dur: number }
}

// Cada letra é desenhada a partir da sua borda esquerda (x = 0).
const letters: Letter[] = [
  { key: 'a', width: 162, circle: true, paths: ['M 145 166 V 294'], move: { x: -6, y: 2, dur: 7.2 } },
  { key: 'p', width: 162, circle: true, paths: ['M 17 166 V 400'], move: { x: 5, y: -3, dur: 8.4 } },
  { key: 'o', width: 162, circle: true, paths: [], move: { x: -5, y: 3, dur: 6.6 } },
  { key: 'r', width: 107, paths: ['M 17 166 V 294', 'M 17 232 C 17 192 47 166 90 166'], move: { x: 7, y: -2, dur: 9.1 } },
  {
    key: 't',
    width: 129,
    paths: ['M 64 112 V 258 C 64 282 80 294 108 294', 'M 17 166 H 112'],
    move: { x: -7, y: 3, dur: 7.8 },
  },
  { key: 'e', width: 162, paths: ['M 17 230 H 145 A 64 64 0 1 0 126.3 275.3'], move: { x: 6, y: -3, dur: 8.9 } },
]

const SPLINE = { calcMode: 'spline', keyTimes: '0;0.5;1', keySplines: '0.45 0 0.55 1;0.45 0 0.55 1' } as const

function offsets() {
  let x = 0
  return letters.map(letter => {
    const at = x
    x += letter.width + GAP
    return at
  })
}

const pillars = ['Sites', 'Sistemas', 'Automação']

export default function Hero({ whatsappHref }: { logoSrc?: string; whatsappHref: string }) {
  const markRef = useRef<SVGSVGElement>(null)
  const xs = offsets()

  // Pausa o movimento quando o hero sai da tela (poupa bateria no celular) e respeita "reduzir movimento".
  useEffect(() => {
    const svg = markRef.current
    if (!svg) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svg.pauseAnimations()
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="inicio" className="hf" aria-labelledby="hf-title">
      <div className="wrap hf-inner">
        <h1 id="hf-title" className="hf-title">
          <svg ref={markRef} className="hf-mark" viewBox="-18 76 1000 356" aria-hidden="true" focusable="false">
            <defs>
              <filter id="hf-goo" x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -10" />
              </filter>
            </defs>

            <g
              filter="url(#hf-goo)"
              fill="none"
              stroke="#0a0a0b"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {letters.map((letter, index) => (
                <g key={letter.key} transform={`translate(${xs[index]} 0)`}>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values={`0 0;${letter.move.x} ${letter.move.y};0 0`}
                      dur={`${letter.move.dur}s`}
                      repeatCount="indefinite"
                      {...SPLINE}
                    />
                    {letter.circle && <circle cx={81} cy={230} r={R} />}
                    {letter.paths.map(d => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                </g>
              ))}

              {/* gota que passa entre as letras e faz as pontes de líquido */}
              <circle cy={236} r={15} fill="#0a0a0b" stroke="none">
                <animate
                  attributeName="cx"
                  values="-8;960;-8"
                  dur="16s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                />
              </circle>
            </g>
          </svg>
          <span className="hf-sr">Aporte — software house: sites, sistemas e automação</span>
        </h1>

        <div className="hf-bottom">
          <div className="hf-badge" aria-hidden="true">
            <svg className="hf-ring" viewBox="0 0 120 120">
              <defs>
                <path id="hf-circle" d="M 60 60 m -47 0 a 47 47 0 1 1 94 0 a 47 47 0 1 1 -94 0" />
              </defs>
              <text>
                <textPath href="#hf-circle" textLength="288" lengthAdjust="spacing">
                  {pillars.map(item => item.toUpperCase()).join(' ✦ ')} ✦
                </textPath>
              </text>
            </svg>
            <svg className="hf-star" viewBox="0 0 24 24">
              <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" />
            </svg>
          </div>

          <div className="hf-side">
            <p className="hf-copy">
              Estratégia, design e tecnologia. Sites, sistemas e automações pensados de acordo com o estágio, o objetivo
              e a necessidade de cada empresa.
            </p>
            <div className="hf-actions">
              <Link className="hf-btn hf-btn-dark" to="/orcamento" data-magnetic>
                Pedir orçamento <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a className="hf-btn hf-btn-line" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="hf-foot">
          <i className="status-dot" aria-hidden="true" /> Disponível para novos projetos · {SITE.address.locality},{' '}
          {SITE.address.region}
        </p>
      </div>
    </section>
  )
}