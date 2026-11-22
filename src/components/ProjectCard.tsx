import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="pk-card">
      <img className="pk-img" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
      <div className="pk-body">
        <span className="pk-type">{project.type}</span>
        <h3>
          <Link to={`/projetos/${project.slug}`} className="pk-link">
            {project.name}
          </Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Tecnologias e áreas">
          {project.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="pk-more" aria-hidden="true">
          Ver projeto <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  )
}