/*
  Pós-build de SEO. Rode depois do `vite build`:  node scripts/prerender.mjs

  O que faz, usando src/data/routes.json como fonte única:
    1. Gera dist/<rota>/index.html para cada página, com <title>, description,
       canonical, Open Graph, Twitter Card e um resumo em <noscript>, já no HTML
       (o Google, o WhatsApp, o LinkedIn etc. leem isso antes de rodar JavaScript).
    2. Gera dist/sitemap.xml e dist/robots.txt.
    3. Gera dist/404.html (com noindex), usada pelo servidor para endereços inexistentes.

  Domínio: defina SITE_URL (ou VITE_SITE_URL) no ambiente ou em .env.
*/
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const readEnvFile = () => {
  const file = join(root, '.env')
  if (!existsSync(file)) return {}
  return Object.fromEntries(
    readFileSync(file, 'utf8')
      .split('\n')
      .map(line => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, '')]),
  )
}

const env = { ...readEnvFile(), ...process.env }
const SITE_URL = (env.SITE_URL || env.VITE_SITE_URL || 'https://seudominio.com.br').replace(/\/$/, '')
if (SITE_URL.includes('seudominio')) {
  console.warn('\n⚠  SITE_URL não definido: usando https://seudominio.com.br. Defina VITE_SITE_URL no .env antes de publicar.\n')
}

const routes = JSON.parse(readFileSync(join(root, 'src/data/routes.json'), 'utf8'))
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const OG_IMAGE = `${SITE_URL}/og-image.png`

const escapeHtml = value =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const urlFor = path => `${SITE_URL}${path === '/' ? '' : path}`

const stripSeoTags = html =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')

const headTags = ({ path, title, description, noindex }) => {
  const url = urlFor(path)
  const type = path.startsWith('/blog/') ? 'article' : 'website'
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="Aporte" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join('\n    ')
}

const noscript = ({ title, description }) => {
  const heading = title.split('|')[0].trim()
  const links = routes
    .filter(route => route.priority >= 0.7 && !route.path.includes('/', 1))
    .map(route => `<a href="${route.path}">${escapeHtml(route.title.split('|')[0].trim())}</a>`)
    .join(' · ')
  return `<noscript><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p><nav>${links}</nav></noscript>`
}

const build = page => {
  let html = stripSeoTags(template)
  html = html.replace('</head>', `    ${headTags(page)}\n  </head>`)
  html = html.replace(/<div id="root"><\/div>/, `<div id="root"></div>\n    ${noscript(page)}`)
  return html
}

const write = (relative, content) => {
  const file = join(dist, relative)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

// 1) uma página HTML por rota
for (const route of routes) {
  write(route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`, build(route))
}

// 2) 404 com noindex
write('404.html', build({ path: '/404', title: 'Página não encontrada | Aporte', description: 'A página que você procurou não existe ou mudou de endereço.', noindex: true }))

// 3) sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter(route => !route.noindex)
  .map(
    route => `  <url>
    <loc>${urlFor(route.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
write('sitemap.xml', sitemap)

// 4) robots.txt
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`✔ SEO: ${routes.length} páginas pré-geradas, sitemap.xml, robots.txt e 404.html em dist/ (${SITE_URL})`)
