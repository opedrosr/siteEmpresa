import { CONTENT_UPDATED, NAV, SITE } from '../data/site.ts'
import { generalFaq } from '../data/content.ts'
import { posts } from '../data/posts.ts'
import { projects } from '../data/projects.ts'
import { services } from '../data/services.ts'
import {
  articleLd,
  blogLd,
  breadcrumbLd,
  faqLd,
  itemListLd,
  organizationLd,
  pageLd,
  projectLd,
  serviceLd,
  websiteLd,
} from './schema.ts'
import type { JsonLd } from './schema.ts'

export type RouteMeta = {
  path: string
  title: string
  description: string
  type: 'website' | 'article'
  noindex?: boolean
  published?: string
  modified?: string
  lastmod: string
  h1: string
  links: { to: string; label: string }[]
  jsonLd: JsonLd[]
}

type Crumb = { name: string; path: string }

const home: Crumb = { name: 'Início', path: '/' }

const crumbs = (...items: Crumb[]) => [breadcrumbLd([home, ...items])]

const servicesCrumb: Crumb = { name: 'Serviços', path: '/servicos' }
const projectsCrumb: Crumb = { name: 'Projetos', path: '/projetos' }
const blogCrumb: Crumb = { name: 'Blog', path: '/blog' }

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Aporte | Software House: Sites, Sistemas e Automação',
    description: SITE.description,
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Estratégia, design e tecnologia.',
    links: [
      ...services.map(s => ({ to: `/servicos/${s.slug}`, label: s.name })),
      ...projects.map(p => ({ to: `/projetos/${p.slug}`, label: p.name })),
      ...posts.map(p => ({ to: `/blog/${p.slug}`, label: p.title })),
      { to: '/orcamento', label: 'Pedir orçamento' },
    ],
    jsonLd: [organizationLd(), websiteLd(), faqLd(generalFaq)],
  },
  {
    path: '/servicos',
    title: 'Serviços de Desenvolvimento de Software | Aporte',
    description:
      'Conheça os serviços da Aporte: sites institucionais, landing pages, sistemas web sob medida e automação de processos com integrações e WhatsApp.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Serviços de desenvolvimento de software',
    links: services.map(s => ({ to: `/servicos/${s.slug}`, label: s.name })),
    jsonLd: [
      ...crumbs(servicesCrumb),
      pageLd('CollectionPage', 'Serviços da Aporte', '/servicos', 'Sites, landing pages, sistemas web e automação.'),
      itemListLd(
        'Serviços da Aporte',
        services.map(s => ({ name: s.name, path: `/servicos/${s.slug}` })),
      ),
    ],
  },
  {
    path: '/projetos',
    title: 'Projetos e Cases | Aporte Software House',
    description:
      'Veja projetos reais desenvolvidos pela Aporte: sistema de agendamento online e site para estética automotiva, com telas e vídeos de demonstração.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Projetos reais',
    links: projects.map(p => ({ to: `/projetos/${p.slug}`, label: p.name })),
    jsonLd: [
      ...crumbs(projectsCrumb),
      pageLd('CollectionPage', 'Projetos da Aporte', '/projetos', 'Seleção de projetos desenvolvidos pela Aporte.'),
      itemListLd(
        'Projetos da Aporte',
        projects.map(p => ({ name: p.name, path: `/projetos/${p.slug}` })),
      ),
    ],
  },
  {
    path: '/sobre',
    title: 'Sobre a Aporte | Software House',
    description:
      'Conheça a Aporte, software house fundada por Pedro Henrique, e os princípios que guiam cada projeto: começar pelo problema e construir para evoluir.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Tecnologia com direção',
    links: [
      { to: '/processo', label: 'Como trabalhamos' },
      { to: '/tecnologia', label: 'Tecnologias' },
    ],
    jsonLd: [
      ...crumbs({ name: 'Sobre', path: '/sobre' }),
      pageLd('AboutPage', 'Sobre a Aporte', '/sobre', 'Quem somos e como trabalhamos.'),
    ],
  },
  {
    path: '/processo',
    title: 'Como Trabalhamos: Processo de Desenvolvimento | Aporte',
    description:
      'Entenda as quatro etapas do processo da Aporte: entendimento, estratégia, construção e evolução, do primeiro contato à entrega do projeto.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Um processo claro, do primeiro contato à evolução',
    links: [{ to: '/orcamento', label: 'Pedir orçamento' }],
    jsonLd: [...crumbs({ name: 'Processo', path: '/processo' })],
  },
  {
    path: '/tecnologia',
    title: 'Tecnologias que Usamos | Aporte',
    description:
      'React, TypeScript, Supabase, APIs e automação: conheça a stack da Aporte e por que escolhemos cada tecnologia de acordo com o problema.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'A tecnologia certa para cada problema',
    links: [{ to: '/servicos', label: 'Serviços' }],
    jsonLd: [...crumbs({ name: 'Tecnologia', path: '/tecnologia' })],
  },
  {
    path: '/blog',
    title: 'Blog sobre Sites, Sistemas e Automação | Aporte',
    description:
      'Artigos sobre criação de sites, sistemas web, SEO e automação de processos para empresas que querem crescer com tecnologia.',
    type: 'website',
    lastmod: posts[0]?.modified ?? CONTENT_UPDATED,
    h1: 'Blog da Aporte',
    links: posts.map(p => ({ to: `/blog/${p.slug}`, label: p.title })),
    jsonLd: [...crumbs(blogCrumb), blogLd(posts)],
  },
  {
    path: '/orcamento',
    title: 'Pedir Orçamento de Site, Sistema ou Automação | Aporte',
    description:
      'Monte o briefing do seu projeto em poucos cliques e envie pelo WhatsApp: site, landing page, sistema ou automação. Sem compromisso.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Monte o seu projeto',
    links: services.map(s => ({ to: `/servicos/${s.slug}`, label: s.name })),
    jsonLd: [...crumbs({ name: 'Orçamento', path: '/orcamento' })],
  },
  {
    path: '/contato',
    title: 'Contato | Fale com a Aporte',
    description:
      'Fale com a Aporte pelo WhatsApp e conte a sua ideia. Atendemos empresas de todo o Brasil, com base em Contagem, MG.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Fale com a Aporte',
    links: [{ to: '/orcamento', label: 'Pedir orçamento' }],
    jsonLd: [
      ...crumbs({ name: 'Contato', path: '/contato' }),
      pageLd('ContactPage', 'Contato da Aporte', '/contato', 'Canais de contato da Aporte.'),
    ],
  },
  {
    path: '/privacidade',
    title: 'Política de Privacidade | Aporte',
    description:
      'Saiba como o site da Aporte trata dados pessoais, o que é coletado quando você pede um orçamento e como exercer os seus direitos pela LGPD.',
    type: 'website',
    lastmod: CONTENT_UPDATED,
    h1: 'Política de privacidade',
    links: [],
    jsonLd: [...crumbs({ name: 'Privacidade', path: '/privacidade' })],
  },
]

const serviceRoutes: RouteMeta[] = services.map(service => ({
  path: `/servicos/${service.slug}`,
  title: service.metaTitle,
  description: service.metaDescription,
  type: 'website',
  lastmod: CONTENT_UPDATED,
  h1: `${service.headline[0]} ${service.headline[1]}`,
  links: [
    { to: '/orcamento', label: 'Pedir orçamento' },
    ...services.filter(s => s.slug !== service.slug).map(s => ({ to: `/servicos/${s.slug}`, label: s.name })),
  ],
  jsonLd: [
    ...crumbs(servicesCrumb, { name: service.name, path: `/servicos/${service.slug}` }),
    serviceLd(service),
    faqLd(service.faq),
  ],
}))

const projectRoutes: RouteMeta[] = projects.map(project => ({
  path: `/projetos/${project.slug}`,
  title: project.metaTitle,
  description: project.metaDescription,
  type: 'website',
  lastmod: CONTENT_UPDATED,
  h1: project.name,
  links: [{ to: `/servicos/${project.service}`, label: 'Serviço relacionado' }],
  jsonLd: [
    ...crumbs(projectsCrumb, { name: project.name, path: `/projetos/${project.slug}` }),
    projectLd(project),
  ],
}))

const postRoutes: RouteMeta[] = posts.map(post => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | Aporte`.length <= 70 ? `${post.title} | Aporte` : post.title,
  description: post.description,
  type: 'article',
  published: post.published,
  modified: post.modified,
  lastmod: post.modified,
  h1: post.title,
  links: [{ to: `/servicos/${post.service}`, label: 'Serviço relacionado' }],
  jsonLd: [...crumbs(blogCrumb, { name: post.title, path: `/blog/${post.slug}` }), articleLd(post)],
}))

const ALL: RouteMeta[] = [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes]

export const NOT_FOUND_META: RouteMeta = {
  path: '/404',
  title: 'Página não encontrada | Aporte',
  description: 'A página que você procurou não existe ou mudou de endereço.',
  type: 'website',
  noindex: true,
  lastmod: CONTENT_UPDATED,
  h1: 'Página não encontrada',
  links: NAV.map(item => ({ to: item.to, label: item.label })),
  jsonLd: [],
}

const normalize = (pathname: string) => pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'

export const getRouteMeta = (pathname: string): RouteMeta | null =>
  ALL.find(route => route.path === normalize(pathname)) ?? null

export const getAllRoutes = () => ALL
