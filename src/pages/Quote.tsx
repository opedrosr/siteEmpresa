import { useSearchParams } from 'react-router-dom'

import PageHero from '../components/PageHero'
import QuoteBuilder from '../components/QuoteBuilder'
import Reveal from '../components/Reveal'
import { isKindId } from '../data/quote'

const next = [
  { n: '01', title: 'Você envia o briefing', text: 'A mensagem abre no seu WhatsApp, pronta. É só tocar em enviar.' },
  { n: '02', title: 'Conversamos', text: 'Respondemos para entender melhor a ideia e tirar as dúvidas que ficarem.' },
  { n: '03', title: 'Proposta', text: 'Com o escopo claro, enviamos uma proposta com entregas e prazos.' },
]

export default function Quote() {
  const [params] = useSearchParams()
  const tipo = params.get('tipo')
  const initialKind = isKindId(tipo) ? tipo : 'sistema'

  return (
    <>
      <PageHero
        kicker="orçamento"
        title="Monte o seu"
        accent="projeto."
        lede="Você não precisa ter tudo definido. Escolha o que mais se parece com a sua ideia, veja o desenho do projeto se formando e envie tudo pelo WhatsApp."
        crumbs={[{ label: 'Orçamento' }]}
      />

      <section className="section contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <QuoteBuilder key={initialKind} initialKind={initialKind} />
          </Reveal>
        </div>
      </section>

      <section className="section theme-light">
        <div className="wrap">
          <Reveal>
            <h2 className="about-h">O que acontece depois</h2>
            <ol className="steps-row steps-3">
              {next.map(step => (
                <li key={step.n}>
                  <span className="steps-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  )
}
