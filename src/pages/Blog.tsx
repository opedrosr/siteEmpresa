import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import PostCard from '../components/PostCard'
import Reveal from '../components/Reveal'
import { posts } from '../data/posts'

export default function Blog() {
  return (
    <>
      <PageHero
        kicker="blog"
        title="Conteúdo para"
        accent="decidir melhor."
        lede="Artigos práticos sobre criação de sites, sistemas web, SEO e automação de processos."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <Reveal className="post-grid">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
