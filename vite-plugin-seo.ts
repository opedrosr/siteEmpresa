// Plugin do Vite: depois do build, gera um HTML por rota (título, descrição, canonical, Open Graph,
// JSON-LD e links internos), além de sitemap.xml, robots.txt, rss.xml e 404.html.
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

import { posts } from './src/data/posts.ts'
import { SITE, SITE_URL, absoluteUrl } from './src/data/site.ts'
import { esc, renderHeadHtml, renderShellHtml } from './src/seo/head.ts'
import { NOT_FOUND_META, getAllRoutes } from './src/seo/routes.ts'
import type { RouteMeta } from './src/seo/routes.ts'

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const ROOT = '<div id="root"></div>'

function renderPage(template: string, route: RouteMeta) {
  if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) {
    throw new Error('index.html precisa conter <!--seo:start--><!--seo:end--> e <div id="root"></div>.')
  }
  return template
    .replace(SEO_BLOCK, `<!--seo:start-->\n    ${renderHeadHtml(route)}\n    <!--seo:end-->`)
    .replace(ROOT, `<div id="root">${renderShellHtml(route)}</div>`)
}

function sitemap(routes: RouteMeta[]) {
  const urls = routes
    .filter(route => !route.noindex)
    .map(route => `  <url>\n    <loc>${esc(absoluteUrl(route.path))}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function rss() {
  const items = posts
    .map(post => {
      const url = absoluteUrl(`/blog/${post.slug}`)
      return `    <item>\n      <title>${esc(post.title)}</title>\n      <link>${esc(url)}</link>\n      <guid>${esc(url)}</guid>\n      <pubDate>${new Date(`${post.published}T12:00:00-03:00`).toUTCString()}</pubDate>\n      <description>${esc(post.description)}</description>\n    </item>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Blog da ${esc(SITE.name)}</title>\n    <link>${SITE_URL}/blog</link>\n    <description>Artigos sobre sites, sistemas e automação.</description>\n    <language>pt-BR</language>\n${items}\n  </channel>\n</rss>\n`
}

export default function seoPlugin(): Plugin {
  let outDir = 'dist'
  let isSsr = false

  return {
    name: 'aporte-seo',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
      isSsr = Boolean(config.build.ssr)
    },
    closeBundle() {
      if (isSsr) return
      const templatePath = path.join(outDir, 'index.html')
      if (!fs.existsSync(templatePath)) return
      const template = fs.readFileSync(templatePath, 'utf8')
      const routes = getAllRoutes()

      routes.forEach(route => {
        const dir = route.path === '/' ? outDir : path.join(outDir, route.path)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), renderPage(template, route))
      })

      fs.writeFileSync(path.join(outDir, '404.html'), renderPage(template, NOT_FOUND_META))
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(routes))
      fs.writeFileSync(path.join(outDir, 'rss.xml'), rss())
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      )
    },
  }
}
