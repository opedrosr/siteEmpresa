import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react'
import type {
  CSSProperties,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  TouchEvent,
} from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers3,
  Menu,
  MessageCircle,
  X,
  Zap,
} from 'lucide-react'

import Hero from './components/Hero'

// O 3D é pesado: só é baixado quando o usuário chega perto da seção.
const Notebook3D = lazy(() => import('./components/Notebook3D'))

// Arquivo da logo (pasta public). Troque aqui se a sua logo tiver outro nome.
const LOGO_SRC = '/aporte-symbol.png'

const WHATSAPP_NUMBER = '5531983994883'

const whatsapp = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`

const GENERIC_MESSAGE = 'Olá! Vim pelo site da Aporte e quero conversar sobre um projeto.'

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const NAV = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Projetos' },
  { id: 'conheca', label: 'Sobre nós' },
  { id: 'consultar', label: 'Contato' },
] as const

const RAIL = [{ id: 'inicio', label: 'Início' }, ...NAV]

/* ---------------------------------------------------------------- dados */

type Project = {
  id: string
  name: string
  type: string
  description: string
  tags: string[]
  image: string
  video: string
  gallery: string[]
}

const projects: Project[] = [
  {
    id: '01',
    name: 'Sistema de Agendamento',
    type: 'Sistema',
    description:
      'Sistema de agendamento desenvolvido para permitir que clientes escolham serviços e horários enquanto o profissional acompanha seus agendamentos em um ambiente próprio.',
    tags: ['Sistema', 'React', 'Supabase', 'Agendamento'],
    image: '/agendamento-01-inicio.png',
    video: '/agendamento-demo.mp4',
    gallery: [
      '/agendamento-01-inicio.png',
      '/agendamento-02-servicos.png',
      '/agendamento-03-horarios.png',
      '/agendamento-04-confirmacao.png',
      '/agendamento-05-painel.png',
    ],
  },
  {
    id: '02',
    name: 'Site de Estética Automotiva',
    type: 'Website',
    description:
      'Site desenvolvido para uma empresa de estética automotiva, com foco em apresentação visual, interação, serviços e condução do visitante até o contato.',
    tags: ['Website', 'UX/UI', 'Interação', 'Mobile'],
    image: '/automotivo-hero-interacao.png',
    video: '/automotivo-demo.mp4',
    gallery: [
      '/automotivo-hero-interacao.png',
      '/automotivo-03-servicos.png',
      '/automotivo-antes-depois.png',
      '/automotivo-contato.png',
    ],
  },
]

type DemoId = 'site' | 'sistema' | 'automacao'

const services = [
  {
    id: 'site' as DemoId,
    icon: Globe,
    title: 'Sites e Landing Pages',
    stack: 'React · TypeScript',
    tone: 'orange',
    text: 'Experiências digitais estratégicas para apresentar sua empresa, seus serviços e transformar visitantes em oportunidades.',
    points: ['Apresentar a empresa e os serviços', 'Receber contatos e pedidos de orçamento', 'Funcionar muito bem no celular'],
    cta: 'Quero um site',
    message: 'Olá! Quero conversar sobre um site ou landing page para a minha empresa.',
    example: 1 as number | null,
  },
  {
    id: 'sistema' as DemoId,
    icon: Layers3,
    title: 'Sistemas',
    stack: 'React · Supabase',
    tone: 'ink',
    text: 'Ferramentas personalizadas para organizar processos, centralizar informações e tornar sua operação mais eficiente.',
    points: ['Agendamentos, pedidos e cadastros', 'Painéis para acompanhar a operação', 'Trocar planilhas e controles manuais'],
    cta: 'Quero um sistema',
    message: 'Olá! Quero conversar sobre um sistema sob medida para a minha empresa.',
    example: 0 as number | null,
  },
  {
    id: 'automacao' as DemoId,
    icon: Zap,
    title: 'Automação',
    stack: 'APIs · Integrações',
    tone: 'paper',
    text: 'Integrações e fluxos inteligentes para reduzir tarefas manuais e conectar as partes importantes do negócio.',
    points: ['Conectar as ferramentas que você já usa', 'Eliminar tarefas repetitivas', 'Avisos e fluxos automáticos'],
    cta: 'Quero automatizar',
    message: 'Olá! Quero conversar sobre automação de processos na minha empresa.',
    example: null as number | null,
  },
]

type KindId = 'site' | 'sistema' | 'automacao' | 'duvida'

type Feature = { id: string; label: string; code: string }

const kinds: { id: KindId; label: string; need: string }[] = [
  { id: 'site', label: 'Site', need: 'Site ou landing page' },
  { id: 'sistema', label: 'Sistema', need: 'Sistema' },
  { id: 'automacao', label: 'Automação', need: 'Automação' },
  { id: 'duvida', label: 'Ainda não sei', need: 'Ainda não sei o que preciso' },
]

const featuresByKind: Record<KindId, Feature[]> = {
  site: [
    { id: 'landing', label: 'Página única (landing)', code: 'LANDING' },
    { id: 'paginas', label: 'Várias páginas', code: 'PÁGINAS' },
    { id: 'form', label: 'Formulário de contato', code: 'FORM' },
    { id: 'zap', label: 'Botão de WhatsApp', code: 'ZAP' },
    { id: 'galeria', label: 'Galeria / portfólio', code: 'GALERIA' },
    { id: 'blog', label: 'Blog ou novidades', code: 'BLOG' },
    { id: 'editar', label: 'Painel para editar textos', code: 'EDITOR' },
    { id: 'seo', label: 'SEO e velocidade', code: 'SEO' },
  ],
  sistema: [
    { id: 'login', label: 'Login de clientes', code: 'LOGIN' },
    { id: 'agenda', label: 'Agendamento online', code: 'AGENDA' },
    { id: 'painel', label: 'Painel administrativo', code: 'PAINEL' },
    { id: 'cadastro', label: 'Cadastro de clientes', code: 'CADASTRO' },
    { id: 'relatorios', label: 'Relatórios e gráficos', code: 'DADOS' },
    { id: 'pagamento', label: 'Pagamentos online', code: 'PAGAR' },
    { id: 'avisos', label: 'Notificações e lembretes', code: 'AVISOS' },
    { id: 'pwa', label: 'Funciona como app no celular', code: 'APP' },
  ],
  automacao: [
    { id: 'whats', label: 'Integração com WhatsApp', code: 'ZAP' },
    { id: 'planilhas', label: 'Planilhas automáticas', code: 'PLANILHA' },
    { id: 'lembretes', label: 'Avisos e lembretes', code: 'AVISOS' },
    { id: 'sistemas', label: 'Sistemas que já uso', code: 'SISTEMAS' },
    { id: 'email', label: 'Envio de e-mails', code: 'E-MAIL' },
    { id: 'leads', label: 'Captura de contatos', code: 'LEADS' },
    { id: 'relatorio', label: 'Relatórios automáticos', code: 'RELATÓR.' },
    { id: 'api', label: 'Conexão via API', code: 'API' },
  ],
  duvida: [],
}

const processSteps = [
  { number: '01', title: 'Entendimento', text: 'Começamos entendendo o negócio, o objetivo e o problema que precisa ser resolvido.' },
  { number: '02', title: 'Estratégia', text: 'Definimos estrutura, experiência e tecnologia de acordo com o cenário real.' },
  { number: '03', title: 'Construção', text: 'Transformamos a estratégia em uma solução com design, tecnologia e atenção aos detalhes.' },
  { number: '04', title: 'Evolução', text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.' },
]

const principles = [
  { title: 'Começamos pelo problema', text: 'Antes de desenhar ou programar, entendemos o negócio e o que precisa ser resolvido.' },
  { title: 'Tudo tem uma função', text: 'Cada tela, botão e automação existe para ajudar o negócio, não só para enfeitar.' },
  { title: 'Feito para evoluir', text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.' },
]

const tools = [
  { name: 'React', text: 'Interfaces rápidas e fluidas' },
  { name: 'TypeScript', text: 'Código mais seguro e fácil de manter' },
  { name: 'Supabase', text: 'Banco de dados, login e backend' },
  { name: 'APIs', text: 'Conexão entre sistemas e serviços' },
  { name: 'Automação', text: 'Fluxos que eliminam trabalho manual' },
  { name: 'UX/UI', text: 'Design pensado para quem usa' },
]

type Tab = 'processo' | 'tecnologia' | 'empresa'

const tabs: { id: Tab; label: string }[] = [
  { id: 'processo', label: 'Processo' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'empresa', label: 'Quem somos' },
]

const bandItems = ['Sites', 'Sistemas', 'Automação', 'UX/UI', 'Mobile first']

/* ----------------------------------------------------------- componentes */

// Palavras mascaradas: cada palavra sobe de dentro de uma "janela" quando o bloco aparece.
function Words({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="w">
            <span style={{ '--i': from + index } as CSSProperties}>{word}</span>
          </span>{' '}
        </Fragment>
      ))}
    </>
  )
}

function DeferredMount({ children, minHeight }: { children: ReactNode; minHeight: number }) {
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

function Band({ tone, reverse }: { tone: 'orange' | 'ink'; reverse?: boolean }) {
  const row = Array.from({ length: 3 }).flatMap((_, round) =>
    bandItems.map(item => (
      <span key={`${round}-${item}`} className="band-item">
        {item}
        <i aria-hidden="true" />
      </span>
    )),
  )
  return (
    <div className={`band band-${tone}${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
      <div className="band-track">
        <div className="band-row">{row}</div>
        <div className="band-row">{row}</div>
      </div>
    </div>
  )
}

function Demo({ kind }: { kind: DemoId }) {
  if (kind === 'site') {
    return (
      <div className="demo demo-site" aria-hidden="true">
        <div className="ds-bar"><i /><i /><i /><b /></div>
        <div className="ds-body">
          <span className="ds-h" style={{ '--k': 0 } as CSSProperties} />
          <span className="ds-h short" style={{ '--k': 1 } as CSSProperties} />
          <span className="ds-p" style={{ '--k': 2 } as CSSProperties} />
          <span className="ds-btn" style={{ '--k': 3 } as CSSProperties}>Falar agora</span>
          <div className="ds-row">
            <span style={{ '--k': 4 } as CSSProperties} />
            <span style={{ '--k': 5 } as CSSProperties} />
            <span style={{ '--k': 6 } as CSSProperties} />
          </div>
        </div>
        <svg className="ds-cursor" viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l14 7-6 2-2 6z" /></svg>
      </div>
    )
  }

  if (kind === 'sistema') {
    return (
      <div className="demo demo-sys" aria-hidden="true">
        <div className="dy-head"><span>OUT</span><b>14:30</b></div>
        <div className="dy-cal">
          {Array.from({ length: 21 }).map((_, index) => (
            <span key={index} className={index === 10 ? 'is-pick' : [2, 5, 8, 13, 17].includes(index) ? 'is-busy' : ''} />
          ))}
        </div>
        <div className="dy-bars">
          {[46, 72, 38, 88, 60, 94].map((height, index) => (
            <i key={index} style={{ '--h': `${height}%`, '--k': index } as CSSProperties} />
          ))}
        </div>
        <div className="dy-toast"><Check size={13} /> Agendado</div>
      </div>
    )
  }

  const nodes = [
    { id: 'a', x: 14, y: 22, label: 'FORM' },
    { id: 'b', x: 14, y: 78, label: 'PLAN.' },
    { id: 'c', x: 50, y: 50, label: 'APORTE' },
    { id: 'd', x: 86, y: 22, label: 'ZAP' },
    { id: 'e', x: 86, y: 78, label: 'E-MAIL' },
  ]
  const links: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4]]
  return (
    <div className="demo demo-auto" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {links.map(([from, to], index) => (
        <span
          key={`p-${from}-${to}`}
          className="da-pulse"
          style={
            {
              '--x1': `${nodes[from].x}%`,
              '--y1': `${nodes[from].y}%`,
              '--x2': `${nodes[to].x}%`,
              '--y2': `${nodes[to].y}%`,
              '--d': `${index < 2 ? index * 0.5 : 1.4 + (index - 2) * 0.4}s`,
            } as CSSProperties
          }
        />
      ))}
      {nodes.map(node => (
        <span key={node.id} className={`da-node${node.id === 'c' ? ' is-core' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          {node.label}
        </span>
      ))}
    </div>
  )
}

// Diagrama do briefing: cada módulo escolhido "acende" e liga ao centro.
function Blueprint({ features, selected }: { features: Feature[]; selected: string[] }) {
  const cx = 220
  const cy = 210
  const radius = 150
  return (
    <svg
      className="blueprint"
      viewBox="0 0 440 420"
      role="img"
      aria-label={`Diagrama do projeto com ${selected.length} de ${features.length} módulos`}
    >
      <circle cx={cx} cy={cy} r={radius} className="bp-orbit" />
      <circle cx={cx} cy={cy} r={radius * 0.6} className="bp-orbit bp-inner" />
      <path d={`M${cx - 190} ${cy}H${cx + 190}M${cx} ${cy - 190}V${cy + 190}`} className="bp-axis" />
      {features.map((feature, index) => {
        const angle = (Math.PI * 2 * index) / features.length - Math.PI / 2
        const x = cx + radius * Math.cos(angle)
        const y = cy + radius * Math.sin(angle)
        const on = selected.includes(feature.id)
        const above = y < cy - 1
        return (
          <g key={feature.id} className={`bp-node${on ? ' is-on' : ''}`}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="bp-line" pathLength={1} />
            <circle cx={x} cy={y} r={on ? 15 : 10} className="bp-dot" />
            {on && <path d={`M${x - 5} ${y}l3.6 3.8L${x + 5.5} ${y - 4}`} className="bp-check" />}
            <text x={x} y={above ? y - 24 : y + 33} textAnchor="middle" className="bp-label">
              {feature.code}
            </text>
          </g>
        )
      })}
      <g className="bp-core">
        <circle cx={cx} cy={cy} r={42} />
        <circle cx={cx} cy={cy} r={54} className="bp-ring" />
        <text x={cx} y={cy + 4} textAnchor="middle">APORTE</text>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------- App */

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [pastHero, setPastHero] = useState(false)
  const [atContact, setAtContact] = useState(false)

  const [activeService, setActiveService] = useState(0)
  const [hintDone, setHintDone] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [activeProject, setActiveProject] = useState(0)
  const [activeGallery, setActiveGallery] = useState(0)

  const [tab, setTab] = useState<Tab>('processo')
  const [processStep, setProcessStep] = useState(0)

  const [kind, setKind] = useState<KindId>('sistema')
  const [picked, setPicked] = useState<string[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const progressRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackFrame = useRef(0)
  const drag = useRef({ startX: 0, startLeft: 0, moved: false })
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const currentProject = projects[activeProject]
  const galleryTotal = currentProject.gallery.length
  const dockVisible = pastHero && !atContact && !menuOpen
  const step = processSteps[processStep]
  const features = featuresByKind[kind]
  const currentKind = kinds.find(item => item.id === kind) ?? kinds[0]

  const closeMenu = () => setMenuOpen(false)

  /* ---------- carrossel de serviços ---------- */

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
      if (track.scrollLeft > 12) setHintDone(true)
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

  /* ---------- escolha de caminho (início) ---------- */

  const showExample = (projectIndex: number) => {
    setActiveProject(projectIndex)
    setActiveGallery(0)
    goTo('portfolio')
  }

  const chooseKind = (id: KindId) => {
    setKind(id)
    setPicked([])
  }

  const toggleFeature = (id: string) =>
    setPicked(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]))

  /* ---------- efeitos globais ---------- */

  // Barra de progresso e header que some ao rolar para baixo (sem re-renderizar a página inteira).
  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(y / max, 1) : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`

        const delta = y - lastY
        if (Math.abs(delta) > 6) {
          setHeaderHidden(delta > 0 && y > 120)
          lastY = y
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Menu mobile: trava a rolagem, fecha com Esc e ao voltar para o desktop.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return undefined

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 769px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Links antigos (#processo, #tecnologia, #empresa) abrem a aba certa.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'processo' || hash === 'tecnologia' || hash === 'empresa') setTab(hash)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  // Indica em qual seção o usuário está.
  useEffect(() => {
    const sections = RAIL.map(item => document.getElementById(item.id)).filter(
      (element): element is HTMLElement => element !== null,
    )
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // A barra fixa de WhatsApp aparece depois do início e some quando o contato está na tela.
  useEffect(() => {
    const hero = document.getElementById('inicio')
    const contact = document.getElementById('consultar')
    if (!hero || !contact) return undefined

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting))
    const contactObserver = new IntersectionObserver(([entry]) => setAtContact(entry.isIntersecting), {
      threshold: 0.12,
    })
    heroObserver.observe(hero)
    contactObserver.observe(contact)
    return () => {
      heroObserver.disconnect()
      contactObserver.disconnect()
    }
  }, [])

  // Entrada suave dos blocos.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.scroll-reveal')
    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // Cursor personalizado e botões magnéticos (só mouse; some com "reduzir movimento").
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
      const link = target.closest('a, button, [role="tab"], label')
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
  }, [])

  // Mantém a miniatura ativa visível na faixa de miniaturas, sem mexer na rolagem da página.
  useEffect(() => {
    const row = galleryRef.current
    const button = row?.children[activeGallery] as HTMLElement | undefined
    if (!row || !button) return
    row.scrollTo({
      left: button.offsetLeft - (row.clientWidth - button.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [activeGallery, activeProject])

  /* ---------- galeria de projetos ---------- */

  const selectProject = (index: number) => {
    setActiveProject(index)
    setActiveGallery(0)
  }

  const goToImage = (index: number) => setActiveGallery((index + galleryTotal) % galleryTotal)

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goToImage(activeGallery + (dx < 0 ? 1 : -1))
    }
  }

  // Inclinação 3D da moldura de projeto (só mouse).
  const handleTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--ry', `${px * 9}deg`)
    element.style.setProperty('--rx', `${-py * 7}deg`)
  }

  const resetTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--ry', '0deg')
    event.currentTarget.style.setProperty('--rx', '0deg')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const chosen = features.filter(feature => picked.includes(feature.id)).map(feature => feature.label)
    const lines = [`Olá! Me chamo ${name.trim()}.`, `Quero: ${currentKind.need}.`]
    if (chosen.length) lines.push(`Módulos: ${chosen.join(', ')}.`)
    if (message.trim()) lines.push('', message.trim())
    window.open(whatsapp(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <nav className="rail" aria-label="Seções">
        {RAIL.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'is-current' : ''}
            aria-current={activeSection === item.id ? 'true' : undefined}
          >
            <span>{item.label}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>

      <header className={`site-header${headerHidden && !menuOpen ? ' is-hidden' : ''}`}>
        <a href="#inicio" className="brand" aria-label="Aporte, voltar ao início" onClick={closeMenu}>
          <img className="brand-logo" src={LOGO_SRC} alt="Aporte" width={36} height={36} />
        </a>

        <nav className="desktop-nav" aria-label="Principal">
          {NAV.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-current' : ''}
              aria-current={activeSection === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn-primary btn-sm header-cta"
          href={whatsapp(GENERIC_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={17} aria-hidden="true" /> Falar no WhatsApp
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(value => !value)}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </header>

      <div id="menu-principal" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Menu">
          {NAV.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu} style={{ '--i': index } as CSSProperties}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <span>{item.label}</span>
              <ChevronRight size={22} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary btn-block"
          href={whatsapp(GENERIC_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
        </a>
      </div>

      <main id="conteudo">
        {/* ================================================ INÍCIO */}
        <Hero logoSrc={LOGO_SRC} whatsappHref={whatsapp(GENERIC_MESSAGE)} />

        <div className="bands" aria-hidden="true">
          <Band tone="orange" />
          <Band tone="ink" reverse />
        </div>

        <DeferredMount minHeight={760}>
          <Suspense fallback={<div className="deferred-fallback" aria-hidden="true" />}>
            <Notebook3D />
          </Suspense>
        </DeferredMount>

        {/* ================================================ SERVIÇOS */}
        <section id="servicos" className="section theme-light">
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">serviços</span>
              <h2 className="section-title">
                <Words text="O que" /> <em><Words text="construímos." from={2} /></em>
              </h2>
              <p className="lede">
                Soluções pensadas de acordo com o estágio, o objetivo e a necessidade de cada empresa.
              </p>
            </div>
          </div>

          <div className="carousel">
            <div className="wrap carousel-top">
              <p className={`swipe-hint${hintDone ? ' is-done' : ''}`} aria-hidden={hintDone}>
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
                <article
                  key={service.id}
                  className={`service-card tone-${service.tone}${activeService === index ? ' is-active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${services.length}`}
                >
                  <div className="card-top">
                    <span>{`// ${String(index + 1).padStart(2, '0')}`}</span>
                    <span>{service.stack}</span>
                  </div>
                  <Demo kind={service.id} />
                  <h3>{service.title}</h3>
                  <p className="card-text">{service.text}</p>
                  <ul>
                    {service.points.map(point => (
                      <li key={point}><Check size={16} aria-hidden="true" />{point}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <a
                      className="btn btn-solid btn-block"
                      href={whatsapp(service.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                    >
                      {service.cta} <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                    {service.example !== null && (
                      <button
                        type="button"
                        className="btn btn-line btn-block"
                        onClick={() => showExample(service.example as number)}
                      >
                        Ver exemplo <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="carousel-bottom">
              <div className="dots" role="group" aria-label="Escolher serviço">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`dot${activeService === index ? ' is-active' : ''}`}
                    aria-label={`Ir para ${service.title}`}
                    aria-current={activeService === index ? 'true' : undefined}
                    onClick={() => scrollToService(index)}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <span className="counter">
                {String(activeService + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </section>

        {/* ================================================ PROJETOS */}
        <section id="portfolio" className="section">
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">projetos</span>
              <h2 className="section-title">
                <Words text="Projetos" /> <em><Words text="reais." from={1} /></em>
              </h2>
              <p className="lede">Uma seleção do que já foi construído pela Aporte.</p>
            </div>

            <div className="proj-switch" role="tablist" aria-label="Escolha um projeto">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  id={`aba-${project.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeProject === index}
                  aria-controls="projeto-painel"
                  className={activeProject === index ? 'is-active' : ''}
                  onClick={() => selectProject(index)}
                >
                  <span className="ps-num">{project.id}</span>
                  <span className="ps-name">
                    <strong>{project.name}</strong>
                    <small>{project.type}</small>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              ))}
            </div>

            <article
              id="projeto-painel"
              role="tabpanel"
              aria-labelledby={`aba-${currentProject.id}`}
              className="proj"
            >
              <div className="proj-ghost" aria-hidden="true">{currentProject.id}</div>

              <div className="proj-stage">
                <div className="frame" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
                  <div className="frame-inner">
                    <div className="frame-top">
                      <span>{`FIG. ${String(activeGallery + 1).padStart(2, '0')}/${String(galleryTotal).padStart(2, '0')}`}</span>
                      <span>{currentProject.type}</span>
                    </div>
                    <div className="shot" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                      <img
                        key={currentProject.gallery[activeGallery]}
                        src={currentProject.gallery[activeGallery]}
                        alt={`${currentProject.name}: tela ${activeGallery + 1} de ${galleryTotal}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <button
                        type="button"
                        className="shot-nav shot-prev"
                        aria-label="Tela anterior"
                        onClick={() => goToImage(activeGallery - 1)}
                      >
                        <ChevronLeft size={22} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="shot-nav shot-next"
                        aria-label="Próxima tela"
                        onClick={() => goToImage(activeGallery + 1)}
                      >
                        <ChevronRight size={22} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="shot-progress" aria-hidden="true">
                      <span style={{ width: `${((activeGallery + 1) / galleryTotal) * 100}%` }} />
                    </div>
                  </div>
                  <i className="mark tl" aria-hidden="true" />
                  <i className="mark tr" aria-hidden="true" />
                  <i className="mark bl" aria-hidden="true" />
                  <i className="mark br" aria-hidden="true" />
                </div>

                <div className="thumbs" ref={galleryRef} aria-label="Telas do projeto">
                  {currentProject.gallery.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={activeGallery === index ? 'is-active' : ''}
                      onClick={() => setActiveGallery(index)}
                      aria-label={`Ver tela ${index + 1}`}
                      aria-current={activeGallery === index ? 'true' : undefined}
                    >
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>

                <p className="shot-hint">
                  <span className="hint-touch">Deslize a imagem ou toque nas miniaturas para ver mais telas.</span>
                  <span className="hint-pointer">Use as setas ou as miniaturas para ver mais telas.</span>
                </p>
              </div>

              <div className="proj-info">
                <span className="project-type">
                  {`// projeto ${currentProject.id}/${String(projects.length).padStart(2, '0')} · ${currentProject.type}`}
                </span>
                <h3>{currentProject.name}</h3>
                <p>{currentProject.description}</p>

                <ul className="tag-list" aria-label="Tecnologias e áreas">
                  {currentProject.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>

                <div className="project-video">
                  <span>Veja funcionando</span>
                  <video
                    key={currentProject.id}
                    src={currentProject.video}
                    poster={currentProject.image}
                    controls
                    playsInline
                    preload="none"
                  />
                </div>

                <a
                  className="btn btn-primary btn-block"
                  data-magnetic
                  href={whatsapp(
                    `Olá! Vi o projeto "${currentProject.name}" no site da Aporte e quero conversar sobre algo parecido.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero algo parecido <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* ================================================ SOBRE */}
        <section id="conheca" className="section theme-light">
          <span id="processo" className="anchor" aria-hidden="true" />
          <span id="tecnologia" className="anchor" aria-hidden="true" />
          <span id="empresa" className="anchor" aria-hidden="true" />

          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">sobre nós</span>
              <h2 className="section-title">
                <Words text="Tecnologia com" /> <em><Words text="direção." from={2} /></em>
              </h2>
              <p className="lede">
                A Aporte cria soluções digitais para empresas que precisam ir além de apenas estar presentes na internet.
              </p>
            </div>

            <div className="tabs" role="tablist" aria-label="Conheça a Aporte">
              {tabs.map(item => (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  aria-controls={`painel-${item.id}`}
                  className={tab === item.id ? 'is-active' : ''}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div
              id="painel-processo"
              role="tabpanel"
              aria-labelledby="tab-processo"
              className="tab-panel"
              hidden={tab !== 'processo'}
            >
              <p className="panel-lede">
                Um processo claro para transformar necessidades reais em soluções digitais que façam sentido para o negócio.
              </p>

              <div className="pipeline" role="group" aria-label="Etapas do processo">
                <div className="pipe-line" aria-hidden="true">
                  <span style={{ width: `${(processStep / (processSteps.length - 1)) * 100}%` }} />
                </div>
                {processSteps.map((item, index) => (
                  <button
                    key={item.number}
                    type="button"
                    className={`pipe-node${processStep === index ? ' is-active' : ''}${processStep > index ? ' is-done' : ''}`}
                    aria-current={processStep === index ? 'step' : undefined}
                    onClick={() => setProcessStep(index)}
                  >
                    <span className="pipe-dot">{processStep > index ? <Check size={16} aria-hidden="true" /> : item.number}</span>
                    <small>{item.title}</small>
                  </button>
                ))}
              </div>

              <div className="step-card" key={step.number}>
                <span className="step-count">{`// etapa ${step.number}/${String(processSteps.length).padStart(2, '0')}`}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="step-actions">
                  <button
                    type="button"
                    className="btn btn-line"
                    disabled={processStep === 0}
                    onClick={() => setProcessStep(processStep - 1)}
                  >
                    <ChevronLeft size={18} aria-hidden="true" /> Anterior
                  </button>
                  {processStep < processSteps.length - 1 ? (
                    <button type="button" className="btn btn-solid" onClick={() => setProcessStep(processStep + 1)}>
                      Próxima etapa <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  ) : (
                    <a className="btn btn-solid" href="#consultar">
                      Começar meu projeto <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div
              id="painel-tecnologia"
              role="tabpanel"
              aria-labelledby="tab-tecnologia"
              className="tab-panel"
              hidden={tab !== 'tecnologia'}
            >
              <p className="panel-lede">
                Escolhemos a tecnologia de acordo com o problema. O objetivo não é usar mais ferramentas, mas construir a combinação certa.
              </p>
              <ul className="tools">
                {tools.map((tool, index) => (
                  <li key={tool.name}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <strong>{tool.name}</strong>
                    <span>{tool.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="painel-empresa"
              role="tabpanel"
              aria-labelledby="tab-empresa"
              className="tab-panel"
              hidden={tab !== 'empresa'}
            >
              <div className="about-grid">
                <figure className="founder">
                  <div className="founder-photo">
                    <img src="/fotoPedro.png" alt="Pedro Henrique, fundador da Aporte" loading="lazy" decoding="async" />
                    <i className="mark tl" aria-hidden="true" />
                    <i className="mark tr" aria-hidden="true" />
                    <i className="mark bl" aria-hidden="true" />
                    <i className="mark br" aria-hidden="true" />
                  </div>
                  <figcaption>
                    <strong>Pedro Henrique</strong>
                    <span>Fundador da Aporte</span>
                  </figcaption>
                </figure>

                <div>
                  <p className="panel-lede">
                    O trabalho começa entendendo o que precisa ser resolvido. A partir daí, design, desenvolvimento e
                    tecnologia entram como ferramentas para construir uma solução que tenha função real.
                  </p>
                  <ul className="principles">
                    {principles.map((item, index) => (
                      <li key={item.title}>
                        <small>{String(index + 1).padStart(2, '0')}</small>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================ CONTATO */}
        <section id="consultar" className="section contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">contato</span>
              <h2 className="section-title">
                <Words text="Monte seu" /> <em><Words text="projeto." from={2} /></em>
              </h2>
              <p className="lede">
                Você não precisa ter tudo definido. Escolha o que mais se parece com a sua ideia, veja o desenho do
                projeto se formando e envie tudo pelo WhatsApp.
              </p>
            </div>

            <form className="builder scroll-reveal" onSubmit={handleSubmit}>
              <div className="builder-controls">
                <fieldset className="b-step">
                  <legend><b>1</b> O que você precisa?</legend>
                  <div className="kind-grid">
                    {kinds.map(item => (
                      <label key={item.id} className="kind">
                        <input
                          type="radio"
                          name="tipo"
                          value={item.id}
                          checked={kind === item.id}
                          onChange={() => chooseKind(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="b-step">
                  <legend><b>2</b> O que ele precisa ter?</legend>
                  {features.length > 0 ? (
                    <div className="feature-grid">
                      {features.map(feature => {
                        const on = picked.includes(feature.id)
                        return (
                          <button
                            key={feature.id}
                            type="button"
                            className={`feature${on ? ' is-on' : ''}`}
                            aria-pressed={on}
                            onClick={() => toggleFeature(feature.id)}
                          >
                            <span className="feature-box" aria-hidden="true">{on && <Check size={14} />}</span>
                            {feature.label}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="b-empty">
                      Sem problema. Conte sua ideia no passo 3 e a gente descobre juntos o melhor caminho.
                    </p>
                  )}
                </fieldset>

                <fieldset className="b-step">
                  <legend><b>3</b> Fale com a gente</legend>
                  <div className="field">
                    <label htmlFor="nome">Seu nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      placeholder="Como podemos te chamar?"
                      required
                      value={name}
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="mensagem">
                      Conte um pouco sobre a ideia <small>(opcional)</small>
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={3}
                      placeholder="Ex.: quero um sistema para agendar meus clientes."
                      value={message}
                      onChange={event => setMessage(event.target.value)}
                    />
                  </div>
                </fieldset>

                <button type="submit" className="btn btn-primary btn-block btn-lg" data-magnetic>
                  <MessageCircle size={20} aria-hidden="true" /> Enviar pelo WhatsApp
                </button>
                <p className="form-note">Vai abrir o WhatsApp com a mensagem pronta. É só tocar em enviar.</p>
                <p className="form-alt">
                  Prefere falar direto?{' '}
                  <a href={whatsapp(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">Abrir o WhatsApp</a>
                </p>
              </div>

              <aside className="builder-view" aria-label="Prévia do projeto">
                <div className="bv-bar">
                  <span>projeto.blueprint</span>
                  <b>
                    {String(picked.length).padStart(2, '0')}/{String(features.length).padStart(2, '0')} módulos
                  </b>
                </div>
                <Blueprint key={kind} features={features} selected={picked} />
                <dl className="bv-brief">
                  <div><dt>tipo</dt><dd>{currentKind.need}</dd></div>
                  <div>
                    <dt>módulos</dt>
                    <dd>
                      {picked.length
                        ? features.filter(feature => picked.includes(feature.id)).map(feature => feature.label).join(' · ')
                        : features.length ? 'toque nas opções ao lado' : 'a definir juntos'}
                    </dd>
                  </div>
                </dl>
              </aside>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-top">
            <a href="#inicio" className="brand" aria-label="Aporte, voltar ao início">
              <img className="brand-logo" src={LOGO_SRC} alt="Aporte" width={36} height={36} loading="lazy" />
            </a>
            <span className="footer-note">Estratégia, design e tecnologia.</span>
            <nav className="footer-links" aria-label="Rodapé">
              <a href="#portfolio">Projetos</a>
              <a href={whatsapp(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </nav>
            <a className="to-top" href="#inicio" aria-label="Voltar ao topo">
              <ArrowUp size={20} aria-hidden="true" />
            </a>
          </div>
          <p className="wordmark" aria-hidden="true">APORTE<span>.</span></p>
          <span className="copyright">© {new Date().getFullYear()} Aporte</span>
        </div>
      </footer>

      <a
        className={`dock${dockVisible ? ' is-visible' : ''}`}
        href={whatsapp(GENERIC_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={!dockVisible}
        tabIndex={dockVisible ? 0 : -1}
      >
        <MessageCircle size={22} aria-hidden="true" /> Falar no WhatsApp
      </a>
    </div>
  )
}

export default App