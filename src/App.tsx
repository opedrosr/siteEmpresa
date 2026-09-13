import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Database,
  Layers3,
  Menu,
  Network,
  Send,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Notebook3D from './components/Notebook3D'

const whatsappNumber = '5531983994883'
const whatsappLink = `https://wa.me/${whatsappNumber}`

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
    type: 'Website / Experiência digital',
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
    number: '01',
    title: 'Sites & Landing Pages',
    text: 'Experiências digitais estratégicas para apresentar sua empresa, seus serviços e transformar visitantes em oportunidades.',
    className: 'solution-wide',
  },
  {
    number: '02',
    title: 'Sistemas',
    text: 'Ferramentas personalizadas para organizar processos, centralizar informações e tornar sua operação mais eficiente.',
    className: 'solution-dark',
  },
  {
    number: '03',
    title: 'Automação',
    text: 'Integrações e fluxos inteligentes para reduzir tarefas manuais e conectar as partes importantes do negócio.',
    className: 'solution-accent',
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

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeProcess, setActiveProcess] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [techRotation, setTechRotation] = useState(0)
  const [activeGallery, setActiveGallery] = useState(0)

  useEffect(() => {
    let frame = 0

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0
        setScrollProgress(progress)
        setTechRotation(window.scrollY * 0.025)
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('.scroll-reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setActiveGallery(0)
  }, [activeProject])

  const currentProject = projects[activeProject]

  const changeProject = (index: number) => {
    setActiveProject(index)
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="site-shell"
      style={
        {
          '--cursor-x': `${cursor.x}px`,
          '--cursor-y': `${cursor.y}px`,
          '--tech-rotation': `${techRotation}deg`,
        } as CSSProperties
      }
    >
      <div className="noise" />
      <div className="cursor-glow" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="site-header glass-panel">
        <a href="#inicio" className="brand" aria-label="Aporte" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><Sparkles size={15} /></span>
          <span>APORTE<span className="brand-dot">.</span></span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#empresa" onClick={() => setMenuOpen(false)}><span className="nav-index">01</span>Empresa</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}><span className="nav-index">02</span>Serviços</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}><span className="nav-index">03</span>Portfólio</a>
          <a href="#processo" onClick={() => setMenuOpen(false)}><span className="nav-index">04</span>Processo</a>
          <a href="#consultar" onClick={() => setMenuOpen(false)}><span className="nav-index">05</span>Consultar</a>
        </nav>

        <a href={whatsappLink} className="header-cta glass-button" target="_blank" rel="noreferrer">
          Vamos conversar <ArrowUpRight size={15} />
        </a>

        <button
          className="mobile-menu glass-button"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen(value => !value)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero-section page-section">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-content">
            <div className="eyebrow glass-chip reveal">
              <span className="status-dot" />
              Soluções digitais para negócios
              <span className="eyebrow-line" />
              Brasil · 2026
            </div>

            <h1 className="hero-title reveal reveal-delay-1">
              Ideias que
              <br />
              viram <em>sistemas.</em>
            </h1>

            <div className="hero-bottom reveal reveal-delay-2">
              <p>
                Criamos experiências digitais, sistemas e automações para empresas
                que querem evoluir sua presença e sua operação.
              </p>
              <a href="#empresa" className="circle-link glass-circle" aria-label="Conhecer a Aporte">
                <ArrowDownRight size={22} />
              </a>
            </div>
          </div>

          <div className="hero-scroll">Scroll <span className="scroll-line" /></div>
        </section>

        <section className="ticker">
          <div className="ticker-track">
            <span>WEB EXPERIENCES</span><i>✦</i>
            <span>DIGITAL SYSTEMS</span><i>✦</i>
            <span>AUTOMATION</span><i>✦</i>
            <span>PRODUCT STRATEGY</span><i>✦</i>
            <span>WEB EXPERIENCES</span><i>✦</i>
            <span>DIGITAL SYSTEMS</span><i>✦</i>
            <span>AUTOMATION</span><i>✦</i>
            <span>PRODUCT STRATEGY</span><i>✦</i>
          </div>
        </section>

        <Notebook3D />

        <section id="empresa" className="projects-section page-section">
          <div className="section-heading scroll-reveal">
            <span className="section-number">01 / A EMPRESA</span>
            <h2>Tecnologia com<br /><em>direção.</em></h2>
            <p>A Aporte cria soluções digitais para empresas que precisam ir além de apenas estar presentes na internet.</p>
          </div>

          <div className="project-stage scroll-reveal">
            <div className="company-visual glass-panel">
              <div className="company-grid" />
              <div className="company-window company-window-main">
                <div className="window-top"><span /><span /><span /></div>
                <div className="window-content">
                  <span className="window-label">APORTE / DIGITAL</span>
                  <strong>estratégia<br />+ tecnologia</strong>
                  <div className="window-bars"><i /><i /><i /></div>
                </div>
              </div>
              <div className="company-orb"><Sparkles size={32} /></div>
              <div className="company-floating company-floating-one glass-panel"><Code2 size={15} /><span>BUILD</span></div>
              <div className="company-floating company-floating-two glass-panel"><Network size={15} /><span>CONNECT</span></div>
            </div>

            <div className="project-info">
              <div className="project-count"><span>APORTE</span> / SOBRE NÓS</div>
              <h3>Não entregamos apenas<br /><em>páginas bonitas.</em></h3>
              <p>Pensamos no problema, na jornada e no resultado. Cada projeto começa pela estratégia e é construído para ter uma função real dentro do negócio.</p>
              <a href="#servicos" className="text-link">Conheça nossas soluções <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="founder-section page-section">
          <div className="founder-copy scroll-reveal">
            <span className="section-number">02 / QUEM ESTÁ POR TRÁS</span>
            <h2>Tecnologia com<br /><em>visão de negócio.</em></h2>
            <p className="founder-lead">
              A Aporte é conduzida por <strong>Pedro Henrique</strong>, fundador da empresa.
            </p>
            <p>
              O trabalho começa entendendo o que precisa ser resolvido. A partir daí,
              design, desenvolvimento e tecnologia entram como ferramentas para construir
              uma solução que tenha função real.
            </p>
            <div className="founder-signature">
              <span>PEDRO HENRIQUE</span>
              <small>FUNDADOR · APORTE</small>
            </div>
          </div>

          <div className="founder-portrait scroll-reveal">
            <div className="founder-frame" />
            <img src="/fotoPedro.png" alt="Pedro Henrique, fundador da Aporte" />
            <div className="founder-label glass-chip">APORTE / FOUNDER</div>
          </div>
        </section>

        <section id="servicos" className="solutions-section page-section">
          <div className="section-heading compact scroll-reveal">
            <span className="section-number">03 / SERVIÇOS</span>
            <h2>O que<br /><em>construímos.</em></h2>
            <p>Soluções pensadas de acordo com o estágio, objetivo e necessidade de cada empresa.</p>
          </div>

          <div className="solution-grid">
            {services.map((service, index) => (
              <article key={service.number} className={`solution-card ${service.className} scroll-reveal`} style={{ transitionDelay: `${index * 90}ms` }}>
                <div className="card-top"><span>{service.number}</span><span>APORTE</span></div>

                {index === 0 && (
                  <div className="browser-mini">
                    <div className="mini-top"><span /><span /><span /></div>
                    <div className="mini-copy"><i>sua presença<br />digital.</i><div className="mini-shape" /></div>
                  </div>
                )}

                {index === 1 && (
                  <div className="data-stack">
                    {['CLIENTES', 'PROCESSOS', 'RESULTADOS'].map((item, itemIndex) => (
                      <div key={item}><span>0{itemIndex + 1}</span><b>{item}</b><ChevronRight size={13} /></div>
                    ))}
                  </div>
                )}

                {index === 2 && (
                  <div className="connection-art">
                    <span /><span /><span /><span />
                    <div className="glass-circle"><Zap size={21} /></div>
                  </div>
                )}

                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="portfolio-real-section page-section">
          <div className="section-heading scroll-reveal">
            <span className="section-number">04 / PORTFÓLIO</span>
            <h2>Projetos<br /><em>reais.</em></h2>
            <p>Uma seleção do que já foi construído pela Aporte.</p>
          </div>

          <div className="real-project-tabs scroll-reveal" role="tablist" aria-label="Projetos">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={activeProject === index ? 'active' : ''}
                onClick={() => changeProject(index)}
                role="tab"
                aria-selected={activeProject === index}
              >
                <span>{project.id}</span>
                <strong>{project.name}</strong>
                <small>{project.type}</small>
              </button>
            ))}
          </div>

          <article className="real-project-case scroll-reveal">
            <div className="real-project-media">
              <div className="real-project-image-wrap">
                <img
                  key={currentProject.gallery[activeGallery]}
                  src={currentProject.gallery[activeGallery]}
                  alt={`${currentProject.name} — visual ${activeGallery + 1}`}
                  className="real-project-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="real-project-gallery" aria-label="Galeria do projeto">
                {currentProject.gallery.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    className={activeGallery === index ? 'active' : ''}
                    onClick={() => setActiveGallery(index)}
                    aria-label={`Ver imagem ${index + 1}`}
                  >
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>

            <div className="real-project-info">
              <div className="real-project-meta">
                <span>{currentProject.id} / 02</span>
                <span>{currentProject.type}</span>
              </div>

              <h3>{currentProject.name}</h3>
              <p>{currentProject.description}</p>

              <div className="tag-list">
                {currentProject.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>

              <div className="real-project-video">
                <div className="video-label"><span>DEMONSTRAÇÃO</span><span>PLAY</span></div>
                <video src={currentProject.video} controls playsInline preload="metadata" />
              </div>

              <a href={whatsappLink} className="text-link" target="_blank" rel="noreferrer">
                Quero conversar sobre um projeto <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        </section>

        <section id="processo" className="process-section page-section">
          <div className="process-intro scroll-reveal">
            <span className="section-number">05 / PROCESSO</span>
            <h2>Como uma ideia<br />vira <em>produto.</em></h2>
            <p>Um processo claro para transformar necessidades reais em soluções digitais que façam sentido para o negócio.</p>
            <div className="process-progress"><span style={{ height: `${((activeProcess + 1) / processSteps.length) * 100}%` }} /></div>
          </div>

          <div className="process-story">
            {processSteps.map((step, index) => (
              <button
                type="button"
                className={`process-step ${activeProcess === index ? 'active' : ''} scroll-reveal`}
                key={step.number}
                onMouseEnter={() => setActiveProcess(index)}
                onFocus={() => setActiveProcess(index)}
                onClick={() => setActiveProcess(index)}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <ArrowUpRight size={18} />
              </button>
            ))}

            <div className="process-result glass-panel scroll-reveal">
              <div className="result-path"><span>IDEIA</span><ChevronRight size={14} /><span>ESTRATÉGIA</span><ChevronRight size={14} /><span>PRODUTO</span><ChevronRight size={14} /><strong>EVOLUÇÃO</strong></div>
              <div className="result-icon glass-circle"><Sparkles size={22} /></div>
            </div>
          </div>
        </section>

        <section className="tech-section page-section">
          <div className="tech-copy scroll-reveal">
            <span className="section-number">06 / TECNOLOGIA</span>
            <h2>Ferramentas são<br />apenas parte da<br /><em>solução.</em></h2>
            <p>Escolhemos a tecnologia de acordo com o problema. O objetivo não é usar mais ferramentas, mas construir a combinação certa.</p>
          </div>

          <div className="tech-map scroll-reveal">
            <div className="tech-lines"><i /><i /><i /><i /></div>
            <div className="tech-node glass-node node-center"><div className="tech-node-content"><Layers3 size={24} /><span>APORTE</span></div></div>
            <div className="tech-node glass-node node-react"><div className="tech-node-content"><Code2 size={18} /><span>WEB</span></div></div>
            <div className="tech-node glass-node node-data"><div className="tech-node-content"><Database size={18} /><span>DATA</span></div></div>
            <div className="tech-node glass-node node-api"><div className="tech-node-content"><Network size={18} /><span>API</span></div></div>
            <div className="tech-node glass-node node-auth"><div className="tech-node-content"><Zap size={18} /><span>AUTO</span></div></div>
          </div>

          <div className="tech-list scroll-reveal">
            <span className="glass-chip">React</span><span className="glass-chip">TypeScript</span><span className="glass-chip">Supabase</span><span className="glass-chip">APIs</span><span className="glass-chip">Automação</span><span className="glass-chip">UX/UI</span>
          </div>
        </section>

        <section id="consultar" className="contact-section">
          <div className="contact-glow" />
          <div className="contact-meta glass-chip scroll-reveal"><span>APORTE / CONSULTA DE PROJETO</span><span>2026</span></div>
          <h2 className="scroll-reveal">Tem uma ideia<br />que merece <em>sair do papel?</em></h2>
          <a className="contact-button glass-button scroll-reveal" href={whatsappLink} target="_blank" rel="noreferrer"><span>CONSULTAR UM PROJETO</span><Send size={18} /></a>
          <p className="scroll-reveal">Conte o que você precisa. Vamos entender juntos qual é o próximo passo.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#inicio" className="brand" aria-label="Voltar ao início">
          <span className="brand-mark"><Sparkles size={15} /></span>
          <span>APORTE<span className="brand-dot">.</span></span>
        </a>
        <span className="footer-note">Estratégia, design e tecnologia.</span>
        <div className="footer-links">
          <a href="#portfolio">Portfólio <ArrowUpRight size={12} /></a>
          <a href={whatsappLink} target="_blank" rel="noreferrer">Contato <ArrowUpRight size={12} /></a>
        </div>
        <span className="copyright">© {new Date().getFullYear()} APORTE</span>
      </footer>
    </div>
  )
}

export default App
