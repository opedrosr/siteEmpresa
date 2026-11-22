import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GENERIC_MESSAGE } from '../data/site'
import Reveal from './Reveal'
import WhatsAppLink from './WhatsAppLink'
import Words from './Words'

export default function CtaBand({
  title = 'Vamos tirar o seu',
  accent = 'projeto do papel?',
  text = 'Conte o que você precisa. Respondemos pelo WhatsApp e, juntos, definimos o melhor caminho.',
  kind,
}: {
  title?: string
  accent?: string
  text?: string
  kind?: string
}) {
  return (
    <section className="section contact cta-band" aria-label="Pedir orçamento">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <Reveal className="cta-inner">
          <span className="kicker">próximo passo</span>
          <h2 className="section-title">
            <Words text={title} />
            <em>
              <Words text={accent} from={title.split(' ').length} />
            </em>
          </h2>
          <p className="lede">{text}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to={kind ? `/orcamento?tipo=${kind}` : '/orcamento'} data-magnetic>
              Pedir orçamento <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <WhatsAppLink className="btn btn-ghost btn-lg" message={GENERIC_MESSAGE}>
              <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
