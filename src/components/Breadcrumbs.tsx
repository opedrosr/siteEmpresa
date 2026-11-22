import { Link } from 'react-router-dom'

export type Crumb = { label: string; to?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Você está em">
      <ol>
        <li>
          <Link to="/">Início</Link>
        </li>
        {items.map(item => (
          <li key={item.label}>
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
