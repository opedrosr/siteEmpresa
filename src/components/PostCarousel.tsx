import { posts } from '../data/posts'
import GlassCarousel from './GlassCarousel'
import PostGlassCard from './PostGlassCard'

// Carrossel de artigos da home ("Conteúdo para decidir melhor").
export default function PostCarousel() {
  return (
    <GlassCarousel
      items={posts}
      getKey={post => post.slug}
      label="Artigos"
      ariaLabel="Artigos do blog da Aporte"
      tone="rose"
      renderCard={(post, index, active) => (
        <PostGlassCard post={post} index={index} total={posts.length} active={active} />
      )}
    />
  )
}