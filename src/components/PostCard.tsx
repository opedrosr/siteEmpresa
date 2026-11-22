import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { readMinutes } from '../data/posts'
import type { Post } from '../data/posts'

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span>{post.category}</span>
        <time dateTime={post.published}>{formatDate(post.published)}</time>
        <span>{readMinutes(post)} min de leitura</span>
      </div>
      <h3>
        <Link to={`/blog/${post.slug}`} className="case-link">
          {post.title}
        </Link>
      </h3>
      <p>{post.description}</p>
      <span className="case-more" aria-hidden="true">
        Ler artigo <ArrowUpRight size={18} />
      </span>
    </article>
  )
}
