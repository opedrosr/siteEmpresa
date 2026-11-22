import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Service } from '../data/services'
import WhatsAppLink from './WhatsAppLink'

const pad = (n: number) => String(n).padStart(2, '0')

// Card de vidro líquido: quase transparente, só o essencial.
// rótulo + link em cima, título e frase no meio, botão em contorno + tecnologia embaixo.
export default function ServiceCard({
  service,
  index,
  total,
  active = true,
}: {
  service: Service
  index: number
  total: number
  active?: boolean
}) {
  return (
    <article
      className={`sg${active ? ' is-active' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}`}
    >
      <header className="sg-top">
        <span className="sg-label">
          {pad(index + 1)} / {pad(total)}
        </span>
        <Link className="sg-link" to={`/servicos/${service.slug}`} draggable={false}>
          Saiba mais
          <span className="sr-only"> sobre {service.name}</span>
          <ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </header>

      <div className="sg-body">
        <h3 className="sg-title">{service.name}</h3>
        <p className="sg-text">{service.summary}</p>
      </div>

      <footer className="sg-foot">
        <WhatsAppLink className="sg-chip" message={service.message}>
          Falar sobre isso
        </WhatsAppLink>
        <span className="sg-meta">{service.stack}</span>
      </footer>
    </article>
  )
}