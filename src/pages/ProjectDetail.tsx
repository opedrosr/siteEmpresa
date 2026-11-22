import { ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import ProjectViewer from '../components/ProjectViewer'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { getProject, projects } from '../data/projects'
import { getService } from '../data/services'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const service = getService(project.service)
  const others = projects.filter(item => item.slug !== project.slug)

  return (
    <>
      <PageHero
        kicker={`projeto ${project.id}`}
        title={project.name}
        lede={project.summary}
        crumbs={[{ label: 'Projetos', to: '/projetos' }, { label: project.name }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <ProjectViewer key={project.slug} project={project} />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <SectionHead kicker="entregas" title="O que foi" accent="construído." />
            <Reveal>
              <ul className="checklist">
                {project.features.map(item => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          {service && (
            <div>
              <SectionHead kicker="serviço" title="Quer algo" accent="parecido?" />
              <Reveal>
                <p className="split-note">
                  Este projeto faz parte do nosso trabalho em <strong>{service.name}</strong>.
                </p>
                <Link className="btn btn-primary" to={`/servicos/${service.slug}`}>
                  Conhecer o serviço <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section theme-light">
          <div className="wrap">
            <SectionHead kicker="mais projetos" title="Veja também" accent="outros trabalhos." />
            <Reveal className="case-grid">
              {others.map(item => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand kind={service?.kind} />
    </>
  )
}
