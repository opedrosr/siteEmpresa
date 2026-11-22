import { Check } from 'lucide-react'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { processSteps } from '../data/content'

export default function Process() {
  return (
    <>
      <PageHero
        kicker="processo"
        title="Um processo claro,"
        accent="do início à evolução."
        lede="Quatro etapas para transformar necessidades reais em soluções digitais que façam sentido para o negócio."
        crumbs={[{ label: 'Processo' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <ol className="timeline">
            {processSteps.map(step => (
              <li key={step.number}>
                <Reveal className="timeline-item">
                  <span className="timeline-num">{step.number}</span>
                  <div>
                    <h2>{step.title}</h2>
                    <p>{step.text}</p>
                    <ul className="checklist">
                      {step.details.map(detail => (
                        <li key={detail}>
                          <Check size={18} aria-hidden="true" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Pronto para começar" accent="o seu projeto?" />
    </>
  )
}
