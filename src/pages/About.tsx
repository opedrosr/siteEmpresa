import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { principles } from '../data/content'
import { SITE } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero
        kicker="sobre nós"
        title="Tecnologia com"
        accent="direção."
        lede="A Aporte cria soluções digitais para empresas que precisam ir além de apenas estar presentes na internet."
        crumbs={[{ label: 'Sobre' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <div className="about-grid">
            <Reveal>
              <figure className="founder">
                <div className="founder-photo">
                  <img
                    src={SITE.founder.photo}
                    alt={`${SITE.founder.name}, fundador da Aporte`}
                    loading="lazy"
                    decoding="async"
                  />
                  <i className="mark tl" aria-hidden="true" />
                  <i className="mark tr" aria-hidden="true" />
                  <i className="mark bl" aria-hidden="true" />
                  <i className="mark br" aria-hidden="true" />
                </div>
                <figcaption>
                  <strong>{SITE.founder.name}</strong>
                  <span>{SITE.founder.role}</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="about-text">
              <h2 className="about-h">Quem é a Aporte</h2>
              <p className="panel-lede">
                A Aporte é uma software house que desenvolve sites, sistemas web e automações. O trabalho começa
                entendendo o que precisa ser resolvido. A partir daí, design, desenvolvimento e tecnologia entram como
                ferramentas para construir uma solução que tenha função real.
              </p>
              <p className="panel-lede">
                Fundada por {SITE.founder.name}, que estuda Análise e Desenvolvimento de Sistemas e tem experiência com
                segurança da informação, a Aporte leva esse cuidado com dados e boas práticas para cada projeto.
              </p>
              <p className="panel-lede">
                A base fica em {SITE.address.locality}, {SITE.address.region}, e o atendimento é remoto, para empresas
                de todo o Brasil.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker="princípios" title="Como pensamos" accent="cada projeto." />
          <Reveal>
            <ul className="principles">
              {principles.map((item, index) => (
                <li key={item.title}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-line" to="/processo">
              Ver como trabalhamos <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-line" to="/tecnologia">
              Ver as tecnologias <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
