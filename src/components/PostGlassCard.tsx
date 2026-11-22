import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { posts } from '../data/posts'

type PostItem = (typeof posts)[number]

const pad = (n: number) => String(n).padStart(2, '0')

// Lê o primeiro campo de texto que existir (os nomes variam de projeto para projeto).
function pick(raw: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = raw[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return ''
}

function humanize(slug: string) {
  const text = slug.replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function formatDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}

// Card de vidro para artigos: mesmo desenho dos serviços, só com o essencial.
export default function PostGlassCard({
  post,
  index,
  total,
  active = true,
}: {
  post: PostItem
  index: number
  total: number
  active?: boolean
}) {
  const raw = post as unknown as Record<string, unknown>
  const slug = pick(raw, ['slug'])
  const title = pick(raw, ['title', 'titulo', 'name', 'heading']) || humanize(slug)
  const text = pick(raw, ['excerpt', 'summary', 'description', 'resumo', 'subtitle', 'lede'])
  const category = pick(raw, ['category', 'categoria', 'tag', 'kicker'])
  const date = formatDate(pick(raw, ['date', 'data', 'publishedAt', 'createdAt']))
  const readRaw = pick(raw, ['readTime', 'readingTime', 'tempoLeitura', 'minutes', 'read'])
  const reading = readRaw ? (/^\d+$/.test(readRaw) ? `${readRaw} min de leitura` : readRaw) : ''

  return (
    <article
      className={`sg${active ? ' is-active' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}`}
    >
      <header className="sg-top">
        <span className="sg-label">{category || `${pad(index + 1)} / ${pad(total)}`}</span>
        <Link className="sg-link" to={`/blog/${slug}`} draggable={false}>
          Ler artigo
          <span className="sr-only"> {title}</span>
          <ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </header>

      <div className="sg-body">
        <h3 className="sg-title sg-title-post">{title}</h3>
        {text && <p className="sg-text">{text}</p>}
      </div>

      <footer className="sg-foot">
        {reading ? <span className="sg-chip">{reading}</span> : <span />}
        {date && <span className="sg-meta">{date}</span>}
      </footer>
    </article>
  )
}