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

const projects = [
  {
    id: '01',
    name: 'Studio Rebeca',
    type: 'Site institucional',
    description:
      'Experiência digital premium criada para apresentar serviços, posicionar a marca e transformar atenção em contato.',
    tags: ['Website', 'UX/UI', 'Conversão'],
    accent: 'orange',
    visual: 'rebeca',
    url: 'studio-rebeca',
  },
  {
    id: '02',
    name: 'Aporte Agenda',
    type: 'Sistema de agendamento',
    description:
      'Produto digital para organizar serviços, disponibilidade e agendamentos em uma operação simples.',
    tags: ['Sistema', 'React', 'Supabase'],
    accent: 'blue',
    visual: 'agenda',
    url: 'aporte-agenda',
  },
  {
    id: '03',
    name: 'Aura Clinic',
    type: 'Experiência digital',
    description:
      'Conceito digital para uma clínica moderna, combinando posicionamento, clareza e experiência.',
    tags: ['Website', 'Branding', 'UX/UI'],
    accent: 'violet',
    visual: 'clinic',
    url: 'aura-clinic',
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

  const currentProject = projects[activeProject]

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
        <a href="#inicio" className="brand" aria-label="Aporte">
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
          aria-label="Abrir menu"
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

        <section id="servicos" className="solutions-section page-section">
          <div className="section-heading compact scroll-reveal">
            <span className="section-number">02 / SERVIÇOS</span>
            <h2>O que<br /><em>construímos.</em></h2>
            <p>Soluções pensadas de acordo com o estágio, objetivo e necessidade de cada empresa.</p>
          </div>

          <div className="solution-grid">
            {services.map((service, index) => (
              <article
                key={service.number}
                className={`solution-card ${service.className} scroll-reveal`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
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

        <section id="portfolio" className="projects-section page-section">
          <div className="section-heading scroll-reveal">
            <span className="section-number">03 / PORTFÓLIO</span>
            <h2>Projetos que<br /><em>ganharam forma.</em></h2>
            <p>Uma seleção de experiências e produtos digitais desenvolvidos para explorar diferentes desafios e possibilidades.</p>
          </div>

          <div className="portfolio-layout scroll-reveal">
            <div className="portfolio-feature">
              <div className={`project-visual portfolio-project project-art-${currentProject.visual}`} data-accent={currentProject.accent}>
                <div className="browser-bar"><span /><span /><span /><b>aporte.digital/{currentProject.url}</b></div>
                <div className="portfolio-preview">
                  {currentProject.visual === 'rebeca' && (
                    <>
                      <div className="preview-rebeca-nav"><span>RB</span><div><i /><i /><i /></div></div>
                      <div className="preview-rebeca-content">
                        <span>NAIL DESIGNER</span>
                        <h3>beleza em<br /><em>cada detalhe.</em></h3>
                        <button type="button">AGENDAR HORÁRIO</button>
                      </div>
                      <div className="preview-rebeca-photo"><div className="photo-glow" /><div className="hand-shape" /></div>
                    </>
                  )}

                  {currentProject.visual === 'agenda' && (
                    <>
                      <aside className="preview-agenda-sidebar"><strong>A</strong><i /><i /><i /><i /></aside>
                      <div className="preview-agenda-main">
                        <div className="agenda-header">
                          <div><span>SEGUNDA, 24</span><h3>Bom dia, Rebeca.</h3></div>
                          <div className="agenda-avatar" />
                        </div>
                        <div className="agenda-cards">
                          <div className="agenda-card agenda-card-main"><span>PRÓXIMO HORÁRIO</span><strong>09:30</strong><small>Manicure · Amanda</small></div>
                          <div className="agenda-card"><span>AGENDAMENTOS</span><strong>12</strong><small>Hoje</small></div>
                        </div>
                        <div className="agenda-list"><span /><span /><span /><span /></div>
                      </div>
                    </>
                  )}

                  {currentProject.visual === 'clinic' && (
                    <>
                      <div className="preview-clinic-header"><span>AURA</span><div><i>CLÍNICA</i><i>ESPECIALIDADES</i><i>CONTATO</i></div></div>
                      <div className="preview-clinic-content">
                        <span>MEDICINA & BEM-ESTAR</span>
                        <h3>Cuidar de você<br />é nossa <em>essência.</em></h3>
                        <button type="button">CONHEÇA A CLÍNICA <ArrowUpRight size={13} /></button>
                      </div>
                      <div className="preview-clinic-image"><div className="clinic-sun" /><div className="clinic-portrait" /></div>
                    </>
                  )}
                </div>
                <div className="project-preview-label"><span>{currentProject.type}</span><span>{currentProject.id} / 03</span></div>
              </div>
            </div>

            <div className="portfolio-info">
              <span className="project-count">{currentProject.id} <span>/ 03</span></span>
              <h3>{currentProject.name}</h3>
              <p>{currentProject.description}</p>
              <div className="tag-list">{currentProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a href={whatsappLink} className="text-link" target="_blank" rel="noreferrer">Quero um projeto assim <ArrowUpRight size={16} /></a>

              <div className="project-switcher">
                {projects.map((project, index) => (
                  <button key={project.id} type="button" className={activeProject === index ? 'active' : ''} onClick={() => setActiveProject(index)}>
                    <span>{project.id}</span><i />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.id}
                className={`portfolio-card scroll-reveal ${activeProject === index ? 'portfolio-card-active' : ''}`}
                onClick={() => setActiveProject(index)}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={`portfolio-card-visual card-${project.visual}`}>
                  {project.visual === 'rebeca' && <><span>RB</span><strong>Studio<br /><em>Rebeca</em></strong><div className="card-hand" /></>}
                  {project.visual === 'agenda' && <><div className="mini-dashboard-sidebar" /><div className="mini-dashboard-content"><span>AGENDA</span><strong>12</strong><i /><i /><i /></div></>}
                  {project.visual === 'clinic' && <><span>AURA</span><strong>sua saúde,<br />sua <em>essência.</em></strong><div className="card-clinic-orb" /></>}
                </div>
                <div className="portfolio-card-bottom"><span>{project.name}</span><ArrowUpRight size={16} /></div>
              </button>
            ))}
          </div>
        </section>

        <section id="processo" className="process-section page-section">
          <div className="process-intro scroll-reveal">
            <span className="section-number">04 / PROCESSO</span>
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
            <span className="section-number">05 / TECNOLOGIA</span>
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
