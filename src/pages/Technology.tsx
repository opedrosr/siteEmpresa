import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { tools } from '../data/content'

export default function Technology() {
  return (
    <>
      <PageHero
        kicker="tecnologia"
        title="A tecnologia certa"
        accent="para cada problema."
        lede="Escolhemos a tecnologia de acordo com o problema. O objetivo não é usar mais ferramentas, mas construir a combinação certa."
        crumbs={[{ label: 'Tecnologia' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <Reveal>
            <ul className="tools tools-wide">
              {tools.map((tool, index) => (
                <li key={tool.name}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <h2>{tool.name}</h2>
                  <span>{tool.text}</span>
                  <p>{tool.long}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="split-note tech-note">
            Veja onde cada tecnologia entra nos nossos <Link to="/servicos">serviços</Link> e nos{' '}
            <Link to="/projetos">projetos</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
