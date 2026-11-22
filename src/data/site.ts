// Fonte única de verdade do site: usada pelo React e pelo plugin de SEO do build.
// ⚠️ Troque SITE_URL pelo domínio real (sem barra no final).
export const SITE_URL = 'https://siteempresa-phi.vercel.app/'

// Data da última revisão de conteúdo das páginas (usada no sitemap). Atualize quando mudar textos.
export const CONTENT_UPDATED = '2026-11-21'

export const SITE = {
  name: 'Aporte',
  url: SITE_URL,
  tagline: 'Software house: sites, sistemas e automação',
  description:
    'A Aporte é uma software house que cria sites institucionais, landing pages, sistemas web sob medida e automações para empresas de todo o Brasil.',
  whatsapp: '5531983994883',
  phoneE164: '+5531983994883',
  logo: '/aporte-symbol.png',
  ogImage: '/og-image.png',
  founder: { name: 'Pedro Henrique', role: 'Fundador da Aporte', photo: '/fotoPedro.png' },
  address: { locality: 'Contagem', region: 'MG', country: 'BR' },
} as const

export const GENERIC_MESSAGE = 'Olá! Vim pelo site da Aporte e quero conversar sobre um projeto.'

export const whatsapp = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`

export const NAV = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
] as const
