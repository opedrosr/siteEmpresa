import type { ReactNode } from 'react'

import Breadcrumbs from './Breadcrumbs'
import type { Crumb } from './Breadcrumbs'
import Reveal from './Reveal'
import Words from './Words'

// Abertura das páginas internas. Contém o único <h1> da página.
export default function PageHero({
  kicker,
  title,
  accent,
  lede,
  crumbs,
  children,
}: {
  kicker: string
  title: string
  accent?: string
  lede?: string
  crumbs: Crumb[]
  children?: ReactNode
}) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <Reveal className="page-hero-body">
          <span className="kicker">{kicker}</span>
          <h1 className="section-title page-title">
            <Words text={title} />
            {accent && (
              <em>
                <Words text={accent} from={title.split(' ').length} />
              </em>
            )}
          </h1>
          {lede && <p className="lede">{lede}</p>}
          {children && <div className="hero-actions">{children}</div>}
        </Reveal>
      </div>
    </header>
  )
}
