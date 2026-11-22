import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <>
      <PageHero
        kicker="projetos"
        title="Projetos"
        accent="reais."
        lede="Uma seleção do que já foi construído pela Aporte, com telas e vídeos de demonstração."
        crumbs={[{ label: 'Projetos' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <Reveal className="case-grid">
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Quer o seu projeto"
        accent="aqui também?"
        text="Conte a sua ideia e vamos desenhar a solução certa para o seu negócio."
      />
    </>
  )
}
