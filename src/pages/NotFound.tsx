import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import PageHero from '../components/PageHero'
import { NAV } from '../data/site'

export default function NotFound() {
  return (
    <>
      <PageHero
        kicker="erro 404"
        title="Página não"
        accent="encontrada."
        lede="O endereço que você procurou não existe ou mudou de lugar. Veja para onde podemos te levar:"
        crumbs={[{ label: 'Página não encontrada' }]}
      >
        <Link className="btn btn-primary btn-lg" to="/">
          Voltar ao início <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section theme-light">
        <div className="wrap">
          <div className="related">
            {NAV.map(item => (
              <Link key={item.to} to={item.to} className="related-link">
                <span>{item.label}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
