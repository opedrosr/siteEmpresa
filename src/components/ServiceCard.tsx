import { ArrowUpRight, Globe, LayoutDashboard, MessageCircle, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Service } from '../data/services'
import Demo from './Demo'
import WhatsAppLink from './WhatsAppLink'

const icons: Record<string, typeof Globe> = {
  site: Globe,
  sys: LayoutDashboard,
  sistema: LayoutDashboard,
  auto: Zap,
  automacao: Zap,
}

// Card de vidro: janela com o título, cartão escuro com o resumo e o botão do WhatsApp flutuando.
export default function ServiceCard({
  service,
  index,
  total,
  active = true,
  offset = 0,
}: {
  service: Service
  index: number
  total: number
  active?: boolean
  offset?: number
}) {
  const Icon = icons[service.demo as string] ?? Globe

  return (
    <article
      className={`service-card gc${active ? ' is-active' : ''}`}
      data-offset={Math.max(-3, Math.min(3, offset))}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}`}
    >
      <div className="gc-media">
        <div className="gc-demo" aria-hidden="true">
          <Demo kind={service.demo} />
        </div>
        <span className="gc-shade" aria-hidden="true" />
        <WhatsAppLink className="gc-orb" message={service.message}>
          <MessageCircle size={22} aria-hidden="true" />
          <span className="sr-only">Falar sobre {service.name} no WhatsApp</span>
        </WhatsAppLink>
        <h3 className="gc-title">{service.name}</h3>
      </div>

      <Link className="gc-dark" to={`/servicos/${service.slug}`} draggable={false}>
        <span className="gc-icon" aria-hidden="true">
          <Icon size={22} />
        </span>
        <span className="gc-dark-main">
          <strong>Saiba mais</strong>
          <small>{service.stack}</small>
          <span className="sr-only"> sobre {service.name}</span>
        </span>
        <span className="gc-go" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
        <span className="gc-text">{service.summary}</span>
      </Link>
    </article>
  )
}