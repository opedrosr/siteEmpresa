// Funções puras (sem DOM): usadas no navegador (dom.ts) e no build (vite-plugin-seo).
import { NAV, SITE, absoluteUrl } from '../data/site.ts'
import type { RouteMeta } from './routes.ts'

export type Tag = { tag: 'meta' | 'link'; attrs: Record<string, string> }

const meta = (key: 'name' | 'property', name: string, content: string): Tag => ({
  tag: 'meta',
  attrs: { [key]: name, content },
})

export function headTags(route: RouteMeta): Tag[] {
  const url = absoluteUrl(route.path === '/' ? '/' : route.path)
  const image = absoluteUrl(SITE.ogImage)
  const robots = route.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const tags: Tag[] = [meta('name', 'description', route.description), meta('name', 'robots', robots)]

  if (!route.noindex) {
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'link', attrs: { rel: 'alternate', hreflang: 'pt-BR', href: url } },
      meta('property', 'og:url', url),
    )
  }

  tags.push(
    meta('property', 'og:type', route.type),
    meta('property', 'og:site_name', SITE.name),
    meta('property', 'og:locale', 'pt_BR'),
    meta('property', 'og:title', route.title),
    meta('property', 'og:description', route.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', `${SITE.name}: ${SITE.tagline}`),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', route.title),
    meta('name', 'twitter:description', route.description),
    meta('name', 'twitter:image', image),
  )

  if (route.type === 'article') {
    if (route.published) tags.push(meta('property', 'article:published_time', route.published))
    if (route.modified) tags.push(meta('property', 'article:modified_time', route.modified))
    tags.push(meta('property', 'article:author', SITE.founder.name))
  }

  return tags
}

/* ------------------------- renderização em string (build) ------------------------- */

export const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHeadHtml(route: RouteMeta): string {
  const tags = headTags(route)
    .map(({ tag, attrs }) => {
      const list = Object.entries(attrs)
        .map(([key, value]) => `${key}="${esc(value)}"`)
        .join(' ')
      return `<${tag} ${list} data-seo>`
    })
    .join('\n    ')

  const ld = route.jsonLd
    .map(item => `<script type="application/ld+json" data-seo>${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')

  return `<title>${esc(route.title)}</title>\n    ${tags}\n    ${ld}`
}

// Conteúdo mínimo dentro de #root: o React o substitui ao carregar, mas robôs que não rodam JS
// (e o primeiro HTML) já recebem o título, o resumo e os links internos.
export function renderShellHtml(route: RouteMeta): string {
  const all = [...NAV.map(item => ({ to: item.to, label: item.label })), ...route.links]
  const seen = new Set<string>()
  const links = all
    .filter(item => (seen.has(item.to) ? false : (seen.add(item.to), true)))
    .map(item => `<li><a href="${esc(item.to)}">${esc(item.label)}</a></li>`)
    .join('')

  return (
    `<div data-prerender style="min-height:100vh;background:#0a0a0b;color:#f4f2ef;font-family:system-ui,sans-serif;padding:110px 20px 40px">` +
    `<div style="max-width:760px;margin:0 auto">` +
    `<p style="margin:0 0 12px;letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:#a7a3ad">${esc(SITE.name)}</p>` +
    `<h1 style="margin:0 0 16px;font-size:clamp(2rem,6vw,3.2rem);line-height:1.05">${esc(route.h1)}</h1>` +
    `<p style="margin:0 0 24px;font-size:18px;line-height:1.6;color:#cdc9d1">${esc(route.description)}</p>` +
    `<nav aria-label="Páginas"><ul style="margin:0;padding-left:18px;line-height:2;color:#ff4b16">${links}</ul></nav>` +
    `</div></div>`
  )
}
