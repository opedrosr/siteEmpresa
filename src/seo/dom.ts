import { headTags } from './head'
import type { RouteMeta } from './routes'

// Atualiza <head> quando a rota muda no navegador (navegação sem recarregar a página).
export function applyMeta(route: RouteMeta) {
  document.title = route.title
  document.head.querySelectorAll('[data-seo]').forEach(element => element.remove())

  headTags(route).forEach(({ tag, attrs }) => {
    const element = document.createElement(tag)
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
    element.setAttribute('data-seo', '')
    document.head.appendChild(element)
  })

  route.jsonLd.forEach(item => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', '')
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}
