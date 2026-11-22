import { ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import StepsRow from '../components/StepsRow'
import WhatsAppLink from '../components/WhatsAppLink'
import { getProject } from '../data/projects'
import { getService, services } from '../data/services'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)
  if (!service) return <NotFound />

  const project = service.project ? getProject(service.project) : undefined
  const others = services.filter(item => item.slug !== service.slug)

  return (
    <>
      <PageHero
        kicker="serviço"
        title={service.headline[0]}
        accent={service.headline[1]}
        lede={service.intro}
        crumbs={[{ label: 'Serviços', to: '/servicos' }, { label: service.name }]}
      >
        <Link className="btn btn-primary btn-lg" to={`/orcamento?tipo=${service.kind}`} data-magnetic>
          Pedir orçamento <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        <WhatsAppLink className="btn btn-ghost btn-lg" message={service.message}>
          <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
        </WhatsAppLink>
      </PageHero>

      <section className="section theme-light">
        <div className="wrap">
          <SectionHead kicker="o que está incluso" title="O que você" accent="recebe." />
          <Reveal className="feat-grid">
            {service.includes.map((item, index) => (
              <article key={item.title} className="feat">
                <small>{String(index + 1).padStart(2, '0')}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <SectionHead kicker="para quem é" title="Indicado" accent="para você se..." />
            <Reveal>
              <ul className="checklist">
                {service.forWho.map(item => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHead kicker="tecnologia" title="Como é" accent="construído." />
            <Reveal>
              <ul className="tag-list" aria-label="Tecnologias usadas">
                {service.tech.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="split-note">
                Escolhemos a combinação certa para o problema, sem ferramentas a mais.{' '}
                <Link to="/tecnologia">Conheça a nossa stack</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section theme-light">
        <div className="wrap">
          <SectionHead kicker="como funciona" title="Do primeiro contato à" accent="entrega." />
          <Reveal>
            <StepsRow />
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-solid" to="/processo">
              Ver o processo completo <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {project && (
        <section className="section">
          <div className="wrap">
            <SectionHead kicker="exemplo" title="Veja um projeto" accent="relacionado." />
            <Reveal className="case-grid case-single">
              <ProjectCard project={project} />
            </Reveal>
          </div>
        </section>
      )}

      <section className={`section${project ? ' theme-light' : ''}`}>
        <div className="wrap">
          <SectionHead kicker="perguntas frequentes" title="Dúvidas sobre" accent={`${service.name.toLowerCase()}.`} />
          <Reveal>
            <FaqList items={service.faq} />
          </Reveal>
        </div>
      </section>

      <section className={`section${project ? '' : ' theme-light'}`}>
        <div className="wrap">
          <SectionHead kicker="outros serviços" title="Veja também" accent="outras soluções." />
          <Reveal className="related">
            {others.map(item => (
              <Link key={item.slug} to={`/servicos/${item.slug}`} className="related-link">
                <span>{item.name}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand kind={service.kind} />
    </>
  )
}
