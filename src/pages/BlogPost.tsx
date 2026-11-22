import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import PostCard, { formatDate } from '../components/PostCard'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { anchor, getPost, posts, readMinutes } from '../data/posts'
import { getService } from '../data/services'
import { SITE } from '../data/site'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const service = getService(post.service)
  const related = posts.filter(item => item.slug !== post.slug)

  return (
    <>
      <PageHero
        kicker={post.category}
        title={post.title}
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.title }]}
      >
        <p className="post-meta post-meta-hero">
          <span>Por {SITE.founder.name}</span>
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          <span>{readMinutes(post)} min de leitura</span>
        </p>
      </PageHero>

      <section className="section theme-light">
        <div className="wrap">
          <article className="prose">
            {post.intro.map(text => (
              <p key={text} className="prose-intro">{text}</p>
            ))}

            {post.sections.length > 3 && (
              <nav className="toc" aria-label="Neste artigo">
                <strong>Neste artigo</strong>
                <ol>
                  {post.sections.map(section => (
                    <li key={section.h}>
                      <a href={`#${anchor(section.h)}`}>{section.h}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {post.sections.map(section => (
              <section key={section.h}>
                <h2 id={anchor(section.h)}>{section.h}</h2>
                {section.p?.map(text => <p key={text}>{text}</p>)}
                {section.ul && (
                  <ul>
                    {section.ul.map(item => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <p className="prose-outro">{post.outro}</p>

            {service && (
              <aside className="prose-cta">
                <strong>{service.name}</strong>
                <p>{service.summary}</p>
                <Link className="btn btn-primary" to={`/servicos/${service.slug}`}>
                  Conhecer o serviço <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </aside>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead kicker="continue lendo" title="Outros" accent="artigos." />
            <Reveal className="post-grid">
              {related.map(item => (
                <PostCard key={item.slug} post={item} />
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand kind={service?.kind} />
    </>
  )
}
