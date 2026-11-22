import { ArrowUpRight, MapPin, MessageCircle, PenLine } from 'lucide-react'
import { Link } from 'react-router-dom'

import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import WhatsAppLink from '../components/WhatsAppLink'
import { GENERIC_MESSAGE, SITE } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="contato"
        title="Fale com a"
        accent="Aporte."
        lede="Conte a sua ideia. Você não precisa ter tudo definido para começar a conversa."
        crumbs={[{ label: 'Contato' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <Reveal className="contact-cards">
            <article className="contact-card is-main">
              <MessageCircle size={28} aria-hidden="true" />
              <h2>WhatsApp</h2>
              <p>O jeito mais rápido de falar com a gente. Abra a conversa com a mensagem pronta.</p>
              <WhatsAppLink className="btn btn-primary btn-block" message={GENERIC_MESSAGE}>
                Chamar no WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
              </WhatsAppLink>
            </article>

            <article className="contact-card">
              <PenLine size={28} aria-hidden="true" />
              <h2>Orçamento guiado</h2>
              <p>Escolha o tipo de projeto e os módulos que precisa. O briefing segue montado para o WhatsApp.</p>
              <Link className="btn btn-solid btn-block" to="/orcamento">
                Montar meu projeto <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </article>

            <article className="contact-card">
              <MapPin size={28} aria-hidden="true" />
              <h2>Onde estamos</h2>
              <p>
                Base em {SITE.address.locality}, {SITE.address.region}. O atendimento é remoto, para empresas de todo o
                Brasil.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
