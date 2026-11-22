import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SITE } from '../data/site'

const pillars = [
  { n: '01', title: 'Sites', text: 'Institucionais e landing pages rápidos, claros e feitos para converter.' },
  { n: '02', title: 'Sistemas', text: 'Agendamentos, cadastros e painéis sob medida para a sua operação.' },
  { n: '03', title: 'Automação', text: 'Integrações e fluxos que eliminam tarefas manuais.' },
]

const stack = ['React', 'TypeScript', 'Supabase', 'APIs', 'n8n']

// Início: estático e leve (sem scroll scrubbing, sem 3D). Contém o <h1> da home.
export default function Hero({ logoSrc, whatsappHref }: { logoSrc: string; whatsappHref: string }) {
  return (
    <section id="inicio" className="h2" aria-labelledby="h2-title">
      <div className="h2-bg" aria-hidden="true">
        <span className="h2-glow" />
        <img className="h2-mark" src={logoSrc} alt="" width={900} height={900} decoding="async" />
        <span className="h2-fade" />
      </div>

      <div className="wrap h2-inner">
        <div className="h2-meta">
          <span className="h2-status">
            <i className="status-dot" aria-hidden="true" /> Disponível para novos projetos
          </span>
          <span className="h2-place">
            {SITE.address.locality}, {SITE.address.region}
          </span>
        </div>

        <div className="h2-main">
          <p className="h2-tag">
            Estratégia, design e <em>tecnologia.</em>
          </p>
          <h1 id="h2-title" className="h2-title">
            Aporte<sup>®</sup>
          </h1>
        </div>

        <div className="h2-cols">
          {pillars.map(item => (
            <div key={item.n}>
              <span className="h2-col-label">
                <small>{item.n}</small> {item.title}
              </span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="h2-actions">
          <Link className="btn btn-primary btn-lg" to="/orcamento" data-magnetic>
            Pedir orçamento <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <a className="btn btn-ghost btn-lg" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
          </a>
        </div>

        <ul className="h2-stack" aria-label="Tecnologias">
          {stack.map(item => (
            <li key={item}>
              <i aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}