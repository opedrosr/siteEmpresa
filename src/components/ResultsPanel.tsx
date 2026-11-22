import { useEffect, useRef, useState } from 'react'

// Números de pesquisas públicas (fontes no rodapé). São referências de mercado.
const mainStat = { value: '+40%', label: 'do faturamento vem do digital' }

const stats = [
  { value: '60%', label: 'pesquisam online antes de comprar' },
  { value: '1,8%', label: 'de faltas com agenda online (vs 5,9%)' },
  { value: '6h+', label: 'por semana livres com automação' },
]

const sources = [
  {
    name: 'Sebrae',
    note: 'Transformação Digital nos Pequenos Negócios, 2023: vendas digitais são mais de 40% do faturamento dos pequenos negócios.',
    url: 'https://agenciasebrae.com.br/inovacao-e-tecnologia/vendas-digitais-sao-responsaveis-por-mais-de-40-do-faturamento-dos-pequenos-negocios/',
  },
  {
    name: 'GS1 Brasil',
    note: 'Tendências de Consumidores, 2023: 60% pesquisam produto e preço na internet.',
    url: 'https://mercadoeconsumo.com.br/24/07/2024/consumo/maioria-dos-consumidores-pesquisa-preco-online-e-gosta-de-testar-produtos-na-loja-fisica/',
  },
  {
    name: 'Frontiers',
    note: 'Um consultório com 16.894 consultas: 1,8% de faltas no agendamento online contra 5,9% nos outros canais.',
    url: 'https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2025.1567397/full',
  },
  {
    name: 'Smartsheet',
    note: 'Cerca de 60% dos profissionais estimam poupar 6 horas ou mais por semana se tarefas repetitivas fossem automatizadas.',
    url: 'https://www.smartsheet.com/content-center/product-news/automation/workers-waste-quarter-work-week-manual-repetitive-tasks',
  },
]

// Duas versões da mesma forma em degrau (ponta redonda, desce em "S", ponta redonda):
// larga no desktop, mais "alta" no celular.
const SHAPES = {
  desktop: {
    w: 1000,
    h: 330,
    d: 'M 90 20 H 560 C 690 20 650 130 780 130 H 910 A 90 90 0 0 1 910 310 H 790 C 700 310 740 200 640 200 H 90 A 90 90 0 0 1 90 20 Z',
  },
  mobile: {
    w: 400,
    h: 250,
    d: 'M 60 10 H 230 C 290 10 270 120 330 120 H 340 A 60 60 0 0 1 340 240 H 300 C 240 240 260 130 200 130 H 60 A 60 60 0 0 1 60 10 Z',
  },
}

// Fitas do visual: cada uma "respira" entre dois formatos (coordenadas de 0 a 1).
type Frame = number[]
const A1: Frame = [-0.06, 0.7, 0.12, -0.2, 0.3, 1.3, 0.47, 0.42, 0.8, -0.12, 1.06, 0.73]
const A2: Frame = [-0.06, 0.25, 0.14, 1.25, 0.34, -0.3, 0.5, 0.62, 0.8, 1.25, 1.06, 0.3]
const B1: Frame = [-0.04, 0.27, 0.16, 1.0, 0.33, -0.25, 0.52, 0.58, 0.84, 1.1, 1.06, 0.36]
const B2: Frame = [-0.04, 0.75, 0.18, -0.1, 0.36, 1.2, 0.54, 0.4, 0.82, -0.2, 1.06, 0.7]
const C1: Frame = [-0.02, 0.5, 0.2, 0.1, 0.32, 0.95, 0.52, 0.36, 0.86, 0.25, 1.04, 0.62]
const C2: Frame = [-0.02, 0.4, 0.22, 0.9, 0.34, 0.1, 0.54, 0.55, 0.84, 0.85, 1.04, 0.35]

const r = (n: number) => Math.round(n * 10) / 10
const path = (v: Frame, w: number, h: number) =>
  `M ${r(v[0] * w)} ${r(v[1] * h)} C ${r(v[2] * w)} ${r(v[3] * h)} ${r(v[4] * w)} ${r(v[5] * h)} ${r(v[6] * w)} ${r(v[7] * h)} S ${r(v[8] * w)} ${r(v[9] * h)} ${r(v[10] * w)} ${r(v[11] * h)}`

function Ribbon({
  from,
  to,
  w,
  h,
  dur,
  stroke,
  width,
  blur,
  opacity,
}: {
  from: Frame
  to: Frame
  w: number
  h: number
  dur: number
  stroke: string
  width: number
  blur?: boolean
  opacity?: number
}) {
  const a = path(from, w, h)
  const b = path(to, w, h)
  return (
    <path
      d={a}
      stroke={stroke}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      opacity={opacity}
      filter={blur ? 'url(#res-blur)' : undefined}
    >
      <animate
        attributeName="d"
        dur={`${dur}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keyTimes="0;0.5;1"
        keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        values={`${a};${b};${a}`}
      />
    </path>
  )
}

function useDesktop() {
  const query = '(min-width: 769px)'
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return desktop
}

export default function ResultsPanel() {
  const desktop = useDesktop()
  const shape = desktop ? SHAPES.desktop : SHAPES.mobile
  const { w, h } = shape
  const svgRef = useRef<SVGSVGElement>(null)

  // Pausa quando sai da tela (poupa bateria no celular) e respeita "reduzir movimento".
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      svg.pauseAnimations()
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [desktop])

  return (
    <div className="res-card theme-light">
      <div className="res-head">
        <h3 className="res-title">
          O digital, <strong>em números.</strong>
        </h3>
        <p className="res-note">Referências de mercado, com fonte.</p>
      </div>

      <div className="res-stage">
        <svg
          ref={svgRef}
          className="res-shape"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="Faixa decorativa em movimento, em tons de laranja e vermelho"
        >
          <defs>
            <clipPath id="res-clip">
              <path d={shape.d} />
            </clipPath>
            <linearGradient id="res-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffb25a" />
              <stop offset=".45" stopColor="#ff4a1c" />
              <stop offset="1" stopColor="#9c0f4f" />
            </linearGradient>
            <linearGradient id="res-g2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd9b0" />
              <stop offset=".5" stopColor="#ff5a1f" />
              <stop offset="1" stopColor="#4a0828" />
            </linearGradient>
            <filter id="res-blur" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation={w * 0.007} />
            </filter>
          </defs>

          <g clipPath="url(#res-clip)">
            <rect width={w} height={h} fill="#0a0a0b" />
            <Ribbon from={A1} to={A2} w={w} h={h} dur={13} stroke="url(#res-g1)" width={h * 0.17} blur />
            <Ribbon from={B1} to={B2} w={w} h={h} dur={17} stroke="url(#res-g2)" width={h * 0.14} blur />
            <Ribbon from={A1} to={A2} w={w} h={h} dur={13} stroke="url(#res-g1)" width={h * 0.08} />
            <Ribbon from={B1} to={B2} w={w} h={h} dur={17} stroke="url(#res-g2)" width={h * 0.06} />
            <Ribbon from={C1} to={C2} w={w} h={h} dur={11} stroke="#ffe3c4" width={h * 0.011} opacity={0.85} />
          </g>
        </svg>

        <div className="res-stats">
          <div className="res-stat is-top">
            <strong>{mainStat.value}</strong>
            <span>{mainStat.label}</span>
          </div>
          {stats.map(item => (
            <div key={item.value} className="res-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="res-sources">
        <span>Fontes</span>
        {sources.map(item => (
          <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" title={item.note}>
            {item.name}
          </a>
        ))}
      </p>
    </div>
  )
}