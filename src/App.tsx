import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode, TouchEvent } from 'react'
import {
  ArrowRight,
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

// O 3D é pesado: só é baixado quando o usuário chega perto da seção.
const Notebook3D = lazy(() => import('./components/Notebook3D'))

const WHATSAPP_NUMBER = '5531983994883'

const whatsapp = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`

const GENERIC_MESSAGE = 'Olá! Vim pelo site da Aporte e quero conversar sobre um projeto.'

const NAV = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Projetos' },
  { id: 'processo', label: 'Como trabalhamos' },
  { id: 'empresa', label: 'Sobre' },
] as const

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

const services = [
  {
    id: 'site',
    icon: Globe,
    title: 'Sites e Landing Pages',
    text: 'Experiências digitais estratégicas para apresentar sua empresa, seus serviços e transformar visitantes em oportunidades.',
    points: [
      'Apresentar a empresa e os serviços',
      'Receber contatos e pedidos de orçamento',
      'Funcionar muito bem no celular',
    ],
    cta: 'Quero um site',
    message: 'Olá! Quero conversar sobre um site ou landing page para a minha empresa.',
  },
  {
    id: 'sistema',
    icon: Layers3,
    title: 'Sistemas',
    text: 'Ferramentas personalizadas para organizar processos, centralizar informações e tornar sua operação mais eficiente.',
    points: [
      'Agendamentos, pedidos e cadastros',
      'Painéis para acompanhar a operação',
      'Trocar planilhas e controles manuais',
    ],
    cta: 'Quero um sistema',
    message: 'Olá! Quero conversar sobre um sistema sob medida para a minha empresa.',
  },
  {
    id: 'automacao',
    icon: Zap,
    title: 'Automação',
    text: 'Integrações e fluxos inteligentes para reduzir tarefas manuais e conectar as partes importantes do negócio.',
    points: [
      'Conectar as ferramentas que você já usa',
      'Eliminar tarefas repetitivas',
      'Avisos e fluxos automáticos',
    ],
    cta: 'Quero automatizar',
    message: 'Olá! Quero conversar sobre automação de processos na minha empresa.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Entendimento',
    text: 'Começamos entendendo o negócio, o objetivo e o problema que precisa ser resolvido.',
  },
  {
    number: '02',
    title: 'Estratégia',
    text: 'Definimos estrutura, experiência e tecnologia de acordo com o cenário real.',
  },
  {
    number: '03',
    title: 'Construção',
    text: 'Transformamos a estratégia em uma solução com design, tecnologia e atenção aos detalhes.',
  },
  {
    number: '04',
    title: 'Evolução',
    text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.',
  },
]

const principles = [
  {
    title: 'Começamos pelo problema',
    text: 'Antes de desenhar ou programar, entendemos o negócio e o que precisa ser resolvido.',
  },
  {
    title: 'Tudo tem uma função',
    text: 'Cada tela, botão e automação existe para ajudar o negócio, não só para enfeitar.',
  },
  {
    title: 'Feito para evoluir',
    text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.',
  },
]

const tools = [
  { name: 'React', text: 'Interfaces rápidas e fluidas' },
  { name: 'TypeScript', text: 'Código mais seguro e fácil de manter' },
  { name: 'Supabase', text: 'Banco de dados, login e backend' },
  { name: 'APIs', text: 'Conexão entre sistemas e serviços' },
  { name: 'Automação', text: 'Fluxos que eliminam trabalho manual' },
  { name: 'UX/UI', text: 'Design pensado para quem usa' },
]

const needs = ['Site ou landing page', 'Sistema', 'Automação', 'Ainda não sei']

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [pastHero, setPastHero] = useState(false)
  const [atContact, setAtContact] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeGallery, setActiveGallery] = useState(0)
  const [activeProcess, setActiveProcess] = useState(0)
  const [activeService, setActiveService] = useState(0)

  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  const [message, setMessage] = useState('')

  const progressRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const currentProject = projects[activeProject]
  const galleryTotal = currentProject.gallery.length
  const dockVisible = pastHero && !atContact && !menuOpen

  const closeMenu = () => setMenuOpen(false)

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

  // Indica em qual seção o usuário está.
  useEffect(() => {
    const ids = ['inicio', ...NAV.map(item => item.id), 'consultar']
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

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
      threshold: 0.15,
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // A etapa do processo acompanha a rolagem (funciona no toque, sem depender de hover).
  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>('[data-step]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveProcess(Number((entry.target as HTMLElement).dataset.step))
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    steps.forEach(step => observer.observe(step))
    return () => observer.disconnect()
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

  const goToService = (index: number) => {
    const track = servicesRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.service-card'))
    if (!cards.length) return
    const nextIndex = (index + cards.length) % cards.length
    setActiveService(nextIndex)
    track.scrollTo({
      left: cards[nextIndex].offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })
  }

  const handleServicesScroll = () => {
    const track = servicesRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.service-card'))
    if (!cards.length) return
    const center = track.getBoundingClientRect().left + track.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(center - (rect.left + rect.width / 2))
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    setActiveService(closestIndex)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const lines = [`Olá! Me chamo ${name.trim()}.`, `Preciso de: ${need}.`]
    if (message.trim()) lines.push('', message.trim())
    window.open(whatsapp(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`site-header${headerHidden && !menuOpen ? ' is-hidden' : ''}`}>
        <a href="#inicio" className="brand" aria-label="Aporte, voltar ao início" onClick={closeMenu}>
          APORTE<span className="brand-dot">.</span>
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
          {NAV.map(item => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
              <span>{item.label}</span>
              <ChevronRight size={22} aria-hidden="true" />
            </a>
          ))}
          <a href="#consultar" onClick={closeMenu}>
            <span>Contato</span>
            <ChevronRight size={22} aria-hidden="true" />
          </a>
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
        <section id="inicio" className="hero">
          <div className="hero-inner">
            <p className="hero-eyebrow reveal">
              <span className="status-dot" aria-hidden="true" /> Software house
            </p>

            <h1 className="hero-title reveal reveal-delay-1">
              Ideias que
              <br />
              viram <em>sistemas.</em>
            </h1>

            <p className="hero-lede reveal reveal-delay-2">
              Criamos sites, sistemas e automações para empresas que querem evoluir sua presença e sua operação.
            </p>

            <div className="hero-actions reveal reveal-delay-3">
              <a
                className="btn btn-primary"
                href={whatsapp(GENERIC_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
              </a>
              <a className="btn btn-ghost" href="#portfolio">
                Ver projetos <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <p className="hero-hint reveal reveal-delay-3">
              Você conversa direto com a equipe, pelo WhatsApp.
            </p>

            <ul className="hero-links reveal reveal-delay-3" aria-label="O que fazemos">
              <li><a href="#servicos">Sites e landing pages</a></li>
              <li><a href="#servicos">Sistemas</a></li>
              <li><a href="#servicos">Automação</a></li>
            </ul>
          </div>
        </section>

        <DeferredMount minHeight={760}>
          <Suspense fallback={<div className="deferred-fallback" aria-hidden="true" />}>
            <Notebook3D />
          </Suspense>
        </DeferredMount>

        <section id="servicos" className="section">
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">Serviços</span>
              <h2 className="section-title">O que <em>construímos.</em></h2>
              <p className="lede">
                Soluções pensadas de acordo com o estágio, o objetivo e a necessidade de cada empresa.
              </p>
            </div>

            <div className="services-carousel">
              <div
                className="service-track"
                ref={servicesRef}
                onScroll={handleServicesScroll}
                aria-label="Carrossel de serviços"
              >
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <article
                      key={service.id}
                      className="service-card scroll-reveal"
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      <span className="service-icon" aria-hidden="true"><Icon size={24} /></span>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <ul>
                        {service.points.map(point => (
                          <li key={point}><Check size={16} aria-hidden="true" />{point}</li>
                        ))}
                      </ul>
                      <a
                        className="btn btn-outline btn-block"
                        href={whatsapp(service.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {service.cta} <ArrowUpRight size={18} aria-hidden="true" />
                      </a>
                    </article>
                  )
                })}
              </div>

              <div className="services-carousel-controls">
                <div className="service-dots" aria-label="Selecionar serviço">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      type="button"
                      className={`service-dot${activeService === index ? ' is-active' : ''}`}
                      aria-label={`Mostrar serviço: ${service.title}`}
                      aria-current={activeService === index ? 'true' : undefined}
                      onClick={() => goToService(index)}
                    />
                  ))}
                </div>
                <div className="service-arrows">
                  <button type="button" className="service-arrow" aria-label="Serviço anterior" onClick={() => goToService(activeService - 1)}>
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button type="button" className="service-arrow" aria-label="Próximo serviço" onClick={() => goToService(activeService + 1)}>
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section section-alt">
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">Projetos</span>
              <h2 className="section-title">Projetos <em>reais.</em></h2>
              <p className="lede">Uma seleção do que já foi construído pela Aporte.</p>
            </div>

            <div className="project-tabs" role="tablist" aria-label="Escolha um projeto">
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
                  <strong>{project.name}</strong>
                  <small>{project.type}</small>
                </button>
              ))}
            </div>

            <article
              id="projeto-painel"
              role="tabpanel"
              aria-labelledby={`aba-${currentProject.id}`}
              className="project-case"
            >
              <div className="project-media">
                <div
                  className="shot"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
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
                  <span className="shot-count" aria-live="polite">
                    {activeGallery + 1} / {galleryTotal}
                  </span>
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

              <div className="project-info">
                <span className="project-type">
                  Projeto {currentProject.id} de {String(projects.length).padStart(2, '0')} · {currentProject.type}
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
                  className="btn btn-dark btn-block"
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

        <section id="processo" className="section">
          <div className="wrap process-layout">
            <div className="process-intro scroll-reveal">
              <span className="kicker">Como trabalhamos</span>
              <h2 className="section-title">Como uma ideia vira <em>produto.</em></h2>
              <p className="lede">
                Um processo claro para transformar necessidades reais em soluções digitais que façam sentido para o negócio.
              </p>
            </div>

            <ol
              className="process-list"
              style={{ '--progress': activeProcess / (processSteps.length - 1) } as CSSProperties}
            >
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  data-step={index}
                  className={`process-step scroll-reveal${activeProcess >= index ? ' is-reached' : ''}${
                    activeProcess === index ? ' is-active' : ''
                  }`}
                >
                  <span className="step-dot" aria-hidden="true">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="empresa" className="section section-alt">
          <div className="wrap about-layout">
            <div className="about-copy scroll-reveal">
              <span className="kicker">Sobre a Aporte</span>
              <h2 className="section-title">Tecnologia com <em>direção.</em></h2>
              <p className="lede">
                A Aporte cria soluções digitais para empresas que precisam ir além de apenas estar presentes na internet.
              </p>

              <ul className="principles">
                {principles.map(item => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="founder scroll-reveal">
              <img src="/fotoPedro.png" alt="Pedro Henrique, fundador da Aporte" loading="lazy" decoding="async" />
              <figcaption>
                <strong>Pedro Henrique</strong>
                <span>Fundador da Aporte</span>
                <p>
                  O trabalho começa entendendo o que precisa ser resolvido. A partir daí, design, desenvolvimento e
                  tecnologia entram como ferramentas para construir uma solução que tenha função real.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="tecnologia" className="section">
          <div className="wrap">
            <div className="section-head scroll-reveal">
              <span className="kicker">Tecnologia</span>
              <h2 className="section-title">Ferramentas são apenas parte da <em>solução.</em></h2>
              <p className="lede">
                Escolhemos a tecnologia de acordo com o problema. O objetivo não é usar mais ferramentas, mas construir a combinação certa.
              </p>
            </div>

            <ul className="tools scroll-reveal">
              {tools.map(tool => (
                <li key={tool.name}>
                  <strong>{tool.name}</strong>
                  <span>{tool.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="consultar" className="contact">
          <div className="wrap contact-layout">
            <div className="contact-copy scroll-reveal">
              <span className="kicker">Contato</span>
              <h2 className="section-title">Tem uma ideia que merece <em>sair do papel?</em></h2>
              <p className="lede">
                Você não precisa ter tudo definido. Escolha o que mais se parece com o que precisa e conte o resto do seu jeito.
              </p>
            </div>

            <form className="contact-form scroll-reveal" onSubmit={handleSubmit}>
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

              <fieldset className="field">
                <legend>O que você precisa?</legend>
                <div className="choices">
                  {needs.map(item => (
                    <label key={item} className="choice">
                      <input
                        type="radio"
                        name="necessidade"
                        value={item}
                        required
                        checked={need === item}
                        onChange={() => setNeed(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label htmlFor="mensagem">
                  Conte um pouco sobre a ideia <small>(opcional)</small>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Ex.: quero um sistema para agendar meus clientes."
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <MessageCircle size={20} aria-hidden="true" /> Enviar pelo WhatsApp
              </button>

              <p className="form-note">
                Vai abrir o WhatsApp com a mensagem pronta. É só tocar em enviar.
              </p>
              <p className="form-alt">
                Prefere falar direto?{' '}
                <a href={whatsapp(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  Abrir o WhatsApp
                </a>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a href="#inicio" className="brand" aria-label="Aporte, voltar ao início">
            APORTE<span className="brand-dot">.</span>
          </a>
          <span className="footer-note">Estratégia, design e tecnologia.</span>
          <nav className="footer-links" aria-label="Rodapé">
            <a href="#portfolio">Projetos</a>
            <a href={whatsapp(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </nav>
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