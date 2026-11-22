import { Suspense, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUp, ArrowUpRight, ChevronRight, Menu, MessageCircle, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { services } from '../data/services'
import { GENERIC_MESSAGE, NAV, SITE } from '../data/site'
import { useCustomCursor } from '../hooks/useCustomCursor'
import { useScrollChrome } from '../hooks/useScrollChrome'
import { applyMeta } from '../seo/dom'
import { NOT_FOUND_META, getRouteMeta } from '../seo/routes'
import WhatsAppLink from './WhatsAppLink'

const NO_DOCK = ['/orcamento', '/contato']

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'is-current' : '')

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const progressRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const { headerHidden, pastTop } = useScrollChrome(progressRef, pathname)
  useCustomCursor(dotRef, ringRef)

  const dockVisible = pastTop && !menuOpen && !NO_DOCK.includes(pathname)
  const closeMenu = () => setMenuOpen(false)

  // SEO: título, descrição, canonical, Open Graph e JSON-LD a cada troca de rota.
  useEffect(() => {
    applyMeta(getRouteMeta(pathname) ?? NOT_FOUND_META)
  }, [pathname])

  // Nova página: volta ao topo (ou vai até a âncora) e leva o foco para o conteúdo.
  useEffect(() => {
    setMenuOpen(false)
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  }, [pathname, hash])

  // Menu mobile: trava a rolagem e fecha com Esc.
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

  // Fecha o menu ao voltar para o desktop.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 769px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <header className={`site-header${headerHidden && !menuOpen ? ' is-hidden' : ''}`}>
        <Link to="/" className="brand" aria-label="Aporte, voltar ao início" onClick={closeMenu}>
          <img className="brand-logo" src={SITE.logo} alt="Aporte" width={36} height={36} />
        </Link>

        <nav className="desktop-nav" aria-label="Principal">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="btn btn-primary btn-sm header-cta" to="/orcamento">
          Pedir orçamento <ArrowUpRight size={17} aria-hidden="true" />
        </Link>

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
            <Link key={item.to} to={item.to} onClick={closeMenu} style={{ '--i': index } as CSSProperties}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <span>{item.label}</span>
              <ChevronRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <Link className="btn btn-primary btn-block" to="/orcamento" onClick={closeMenu}>
            Pedir orçamento <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <WhatsAppLink className="btn btn-ghost btn-block" message={GENERIC_MESSAGE} onClick={closeMenu}>
            <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <main id="conteudo" tabIndex={-1}>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="brand" aria-label="Aporte, voltar ao início">
                <img className="brand-logo" src={SITE.logo} alt="Aporte" width={36} height={36} loading="lazy" />
              </Link>
              <p>{SITE.description}</p>
              <p className="footer-place">
                {SITE.address.locality}, {SITE.address.region} · Atendimento em todo o Brasil
              </p>
            </div>

            <nav className="footer-col" aria-label="Serviços">
              <h2>Serviços</h2>
              <ul>
                {services.map(service => (
                  <li key={service.slug}>
                    <Link to={`/servicos/${service.slug}`}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Empresa">
              <h2>Empresa</h2>
              <ul>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/projetos">Projetos</Link></li>
                <li><Link to="/processo">Como trabalhamos</Link></li>
                <li><Link to="/tecnologia">Tecnologia</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Contato">
              <h2>Contato</h2>
              <ul>
                <li><Link to="/orcamento">Pedir orçamento</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li>
                  <WhatsAppLink className="" message={GENERIC_MESSAGE}>WhatsApp</WhatsAppLink>
                </li>
                <li><Link to="/privacidade">Privacidade</Link></li>
              </ul>
            </nav>
          </div>

          <p className="wordmark" aria-hidden="true">APORTE<span>.</span></p>
          <div className="footer-bottom">
            <span className="copyright">© {new Date().getFullYear()} Aporte. Todos os direitos reservados.</span>
            <a className="to-top" href="#conteudo" aria-label="Voltar ao topo">
              <ArrowUp size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppLink className={`dock${dockVisible ? ' is-visible' : ''}`} message={GENERIC_MESSAGE}>
        <MessageCircle size={22} aria-hidden="true" /> Falar no WhatsApp
      </WhatsAppLink>
    </div>
  )
}
