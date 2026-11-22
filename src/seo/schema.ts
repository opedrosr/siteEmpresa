import type { Faq } from '../data/content.ts'
import type { Post } from '../data/posts.ts'
import type { Project } from '../data/projects.ts'
import type { Service } from '../data/services.ts'
import { SITE, SITE_URL, absoluteUrl, whatsapp } from '../data/site.ts'

export type JsonLd = Record<string, unknown>

const CTX = 'https://schema.org'
export const ORG_ID = `${SITE_URL}/#organization`
export const SITE_ID = `${SITE_URL}/#website`

export const organizationLd = (): JsonLd => ({
  '@context': CTX,
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE.name,
  url: `${SITE_URL}/`,
  description: SITE.description,
  logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo) },
  image: absoluteUrl(SITE.ogImage),
  founder: { '@type': 'Person', name: SITE.founder.name },
  telephone: SITE.phoneE164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: SITE.phoneE164,
    availableLanguage: 'pt-BR',
    url: whatsapp(),
  },
  knowsAbout: [
    'Desenvolvimento de sites',
    'Sistemas web',
    'Automação de processos',
    'Integrações via API',
    'SEO técnico',
  ],
})

export const websiteLd = (): JsonLd => ({
  '@context': CTX,
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: SITE.name,
  inLanguage: 'pt-BR',
  publisher: { '@id': ORG_ID },
})

export const breadcrumbLd = (items: { name: string; path: string }[]): JsonLd => ({
  '@context': CTX,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const faqLd = (items: Faq[]): JsonLd => ({
  '@context': CTX,
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export const serviceLd = (service: Service): JsonLd => ({
  '@context': CTX,
  '@type': 'Service',
  name: service.name,
  serviceType: service.name,
  description: service.metaDescription,
  url: absoluteUrl(`/servicos/${service.slug}`),
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: absoluteUrl('/orcamento') },
})

export const itemListLd = (name: string, items: { name: string; path: string }[]): JsonLd => ({
  '@context': CTX,
  '@type': 'ItemList',
  name,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
})

export const projectLd = (project: Project): JsonLd => ({
  '@context': CTX,
  '@type': 'CreativeWork',
  name: project.name,
  description: project.metaDescription,
  url: absoluteUrl(`/projetos/${project.slug}`),
  image: absoluteUrl(project.image),
  creator: { '@id': ORG_ID },
  keywords: project.tags.join(', '),
  inLanguage: 'pt-BR',
})

export const articleLd = (post: Post): JsonLd => ({
  '@context': CTX,
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.published,
  dateModified: post.modified,
  inLanguage: 'pt-BR',
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  image: absoluteUrl(SITE.ogImage),
  author: { '@type': 'Person', name: SITE.founder.name },
  publisher: { '@id': ORG_ID },
})

export const blogLd = (list: Post[]): JsonLd => ({
  '@context': CTX,
  '@type': 'Blog',
  name: `Blog da ${SITE.name}`,
  url: absoluteUrl('/blog'),
  inLanguage: 'pt-BR',
  publisher: { '@id': ORG_ID },
  blogPost: list.map(post => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.published,
  })),
})

export const pageLd = (type: 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'WebPage', name: string, path: string, description: string): JsonLd => ({
  '@context': CTX,
  '@type': type,
  name,
  description,
  url: absoluteUrl(path),
  inLanguage: 'pt-BR',
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
})
