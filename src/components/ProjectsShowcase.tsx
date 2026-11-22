import { ArrowUpRight, ChevronDown, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'

import { projects } from '../data/projects'

// Lista em vidro: cada projeto abre e fecha, e o botão de baixo mostra ou esconde todos de uma vez.
export default function ProjectsShowcase() {
  const uid = useId()
  const [open, setOpen] = useState<string[]>([])
  const allOpen = open.length === projects.length

  const toggle = (slug: string) =>
    setOpen(current => (current.includes(slug) ? current.filter(item => item !== slug) : [...current, slug]))

  return (
    <div className="pj">
      <img className="pj-bg" src={projects[0].image} alt="" aria-hidden="true" loading="lazy" decoding="async" />

      <div className="pj-panel">
        <p className="pj-label">{projects.length} projetos</p>

        <ul className="pj-list">
          {projects.map(project => {
            const isOpen = open.includes(project.slug)
            const panelId = `${uid}-${project.slug}`
            return (
              <li key={project.slug} className={`pj-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="pj-row"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(project.slug)}
                >
                  <span className="pj-name">
                    <strong>{project.name}</strong>
                    <small>{project.type}</small>
                  </span>
                  <Plus className="pj-plus" size={20} aria-hidden="true" />
                </button>

                <div className="pj-more" id={panelId}>
                  <div className="pj-more-inner">
                    <div className="pj-body">
                      <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                      <div className="pj-text">
                        <p>{project.summary}</p>
                        <ul className="tag-list" aria-label="Tecnologias e áreas">
                          {project.tags.map(tag => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                        <Link className="pj-link" to={`/projetos/${project.slug}`} tabIndex={isOpen ? 0 : -1}>
                          Ver projeto <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className={`pj-toggle${allOpen ? ' is-open' : ''}`}
          aria-expanded={allOpen}
          onClick={() => setOpen(allOpen ? [] : projects.map(project => project.slug))}
        >
          {allOpen ? 'Mostrar menos' : 'Mostrar mais'} <ChevronDown size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}