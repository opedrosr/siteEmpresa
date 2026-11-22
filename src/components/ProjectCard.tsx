import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="case-card">
      <div className="case-media">
        <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
        <span className="case-num">{project.id}</span>
      </div>
      <div className="case-body">
        <span className="project-type">{project.type}</span>
        <h3>
          <Link to={`/projetos/${project.slug}`} className="case-link">
            {project.name}
          </Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Tecnologias e áreas">
          {project.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="case-more" aria-hidden="true">
          Ver projeto <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  )
}
