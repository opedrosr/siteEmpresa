import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SITE } from '../data/site'

// Início: estático e leve. O fundo de fogo/fumaça é um SVG (sem imagem, sem canvas, sem 3D).
// Contém o <h1> da home.
export default function Hero({ whatsappHref }: { logoSrc?: string; whatsappHref: string }) {
  return (
    <section id="inicio" className="h2" aria-labelledby="h2-title">
      <div className="h2-bg" aria-hidden="true">
        <div className="h2-smoke">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <filter id="h2-fire" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.0045 0.009" numOctaves="3" seed="11" result="big" />
                <feDisplacementMap in="SourceGraphic" in2="big" scale="150" xChannelSelector="R" yChannelSelector="G" result="d1" />
                <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="3" seed="4" result="fine" />
                <feDisplacementMap in="d1" in2="fine" scale="38" xChannelSelector="G" yChannelSelector="R" result="d2" />
                <feGaussianBlur in="d2" stdDeviation="9" />
              </filter>
              <filter id="h2-haze" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="60" />
              </filter>
            </defs>

            <g filter="url(#h2-haze)" opacity=".75">
              <ellipse cx="760" cy="470" rx="520" ry="210" fill="#7a1a00" />
              <ellipse cx="1150" cy="330" rx="380" ry="150" fill="#b8300a" opacity=".6" />
            </g>

            <g filter="url(#h2-fire)" fill="none" strokeLinecap="round">
              <g stroke="#a82a05" strokeWidth="150" opacity=".7">
                <path d="M -100 640 C 250 520, 470 720, 780 530 S 1200 340, 1700 400" />
                <path d="M 320 410 C 620 250, 820 540, 1120 370 S 1420 300, 1700 210" />
              </g>
              <g stroke="#ff5a1f" strokeWidth="60" opacity=".92">
                <path d="M -100 640 C 250 520, 470 720, 780 530 S 1200 340, 1700 400" />
                <path d="M 320 410 C 620 250, 820 540, 1120 370 S 1420 300, 1700 210" />
                <path d="M 500 770 C 800 700, 1000 650, 1300 705 S 1560 650, 1700 570" opacity=".7" />
              </g>
              <g stroke="#ffb347" strokeWidth="18" opacity=".95">
                <path d="M -100 640 C 250 520, 470 720, 780 530 S 1200 340, 1700 400" />
                <path d="M 320 410 C 620 250, 820 540, 1120 370 S 1420 300, 1700 210" />
              </g>
              <g stroke="#fff1cf" strokeWidth="5" opacity=".85">
                <path d="M 120 600 C 330 540, 500 690, 780 530 S 1080 400, 1300 380" />
              </g>
            </g>
          </svg>
        </div>
        <span className="h2-shade" />
      </div>

      <div className="wrap h2-inner">
        <h1 id="h2-title" className="h2-title">
          Aporte
          <span className="h2-sr"> — software house: sites, sistemas e automação</span>
        </h1>

        <div className="h2-bottom">
          <div className="h2-badge" aria-hidden="true">
            <svg className="h2-ring" viewBox="0 0 120 120">
              <defs>
                <path id="h2-circle" d="M 60 60 m -47 0 a 47 47 0 1 1 94 0 a 47 47 0 1 1 -94 0" />
              </defs>
              <text>
                <textPath href="#h2-circle" textLength="288" lengthAdjust="spacing">
                  SITES ✦ SISTEMAS ✦ AUTOMAÇÃO ✦
                </textPath>
              </text>
            </svg>
            <svg className="h2-star" viewBox="0 0 24 24">
              <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" />
            </svg>
          </div>

          <div className="h2-side">
            <p className="h2-copy">
              Estratégia, design e tecnologia. Sites, sistemas e automações pensados de acordo com o estágio, o objetivo
              e a necessidade de cada empresa.
            </p>
            <div className="h2-actions">
              <Link className="h2-btn h2-btn-light" to="/orcamento" data-magnetic>
                Pedir orçamento <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a className="h2-btn h2-btn-glass" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="h2-foot">
          <i className="status-dot" aria-hidden="true" /> Disponível para novos projetos · {SITE.address.locality},{' '}
          {SITE.address.region}
        </p>
      </div>
    </section>
  )
}