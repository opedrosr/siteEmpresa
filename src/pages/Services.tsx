import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import ServiceCard from '../components/ServiceCard'
import { generalFaq } from '../data/content'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageHero
        kicker="serviços"
        title="Serviços de desenvolvimento"
        accent="de software."
        lede="Sites, landing pages, sistemas e automações. Cada solução é pensada de acordo com o estágio, o objetivo e a necessidade da sua empresa."
        crumbs={[{ label: 'Serviços' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <Reveal className="svc-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} total={services.length} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="como escolher"
            title="Qual serviço faz sentido"
            accent="para você?"
            lede="Compare o objetivo de cada solução. Em dúvida, conte o seu cenário e indicamos o caminho."
          />
          <Reveal className="compare">
            <table>
              <caption className="sr-only">Comparação entre os serviços da Aporte</caption>
              <thead>
                <tr>
                  <th scope="col">Serviço</th>
                  <th scope="col">Formato</th>
                  <th scope="col">Indicado para</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.slug}>
                    <th scope="row">
                      <Link to={`/servicos/${service.slug}`}>{service.name}</Link>
                    </th>
                    <td>{service.comparison.format}</td>
                    <td>{service.comparison.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section theme-light">
        <div className="wrap">
          <SectionHead kicker="perguntas frequentes" title="Dúvidas" accent="comuns." />
          <Reveal>
            <FaqList items={generalFaq} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
