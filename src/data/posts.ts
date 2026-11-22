export type PostSection = { h: string; p?: string[]; ul?: string[] }

export type Post = {
  slug: string
  title: string
  description: string
  category: string
  published: string
  modified: string
  service: string
  intro: string[]
  sections: PostSection[]
  outro: string
}

export const anchor = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const readMinutes = (post: Post) => {
  const text = [...post.intro, post.outro, ...post.sections.flatMap(s => [s.h, ...(s.p ?? []), ...(s.ul ?? [])])].join(' ')
  return Math.max(2, Math.round(text.split(/\s+/).length / 200))
}

export const posts: Post[] = [
  {
    slug: 'site-institucional-ou-landing-page',
    title: 'Site institucional ou landing page: qual escolher para a sua empresa?',
    description:
      'Entenda a diferença entre site institucional e landing page, quando usar cada um e como decidir o melhor formato para o seu objetivo.',
    category: 'Sites',
    published: '2026-11-21',
    modified: '2026-11-21',
    service: 'sites-institucionais',
    intro: [
      'Quando uma empresa decide entrar de verdade na internet, a primeira dúvida costuma ser: faço um site institucional ou uma landing page? As duas opções resolvem problemas diferentes, e escolher a errada significa gastar em algo que não responde ao seu objetivo.',
    ],
    sections: [
      {
        h: 'O que é uma landing page',
        p: [
          'Landing page é uma página única, desenhada para levar o visitante a uma ação específica: pedir um orçamento, se cadastrar, comprar ou chamar no WhatsApp. Ela evita menus com dezenas de caminhos justamente para não distrair.',
          'É a escolha certa para campanhas pagas, lançamentos, ofertas e captação de contatos, porque fica fácil medir quantas visitas viraram resultado.',
        ],
      },
      {
        h: 'O que é um site institucional',
        p: [
          'O site institucional é a casa digital da empresa. Reúne várias páginas, como início, serviços, sobre, projetos, blog e contato, e responde às perguntas de quem quer conhecer você antes de fechar negócio.',
          'Ele constrói confiança e, quando bem estruturado, permite ser encontrado no Google por quem busca o que você faz, porque cada serviço e cada artigo pode ter a sua própria página.',
        ],
      },
      {
        h: 'Como decidir',
        ul: [
          'Quer testar uma oferta ou rodar anúncios agora? Comece por uma landing page.',
          'Quer ser encontrado no Google e passar credibilidade no longo prazo? Escolha o site institucional.',
          'Vende serviços em que o cliente pesquisa antes de contratar? O site institucional ajuda mais.',
          'Tem pouco tempo e orçamento enxuto? Uma landing page bem feita já valida a ideia.',
        ],
      },
      {
        h: 'Dá para ter os dois?',
        p: [
          'Sim, e é o caminho mais comum. O site institucional é a base, e as landing pages entram como páginas de campanha dentro do mesmo domínio, aproveitando a autoridade que o site já construiu.',
          'É assim que estruturamos o site da própria Aporte: uma página por serviço, projetos, blog e uma página de orçamento para captar contatos.',
        ],
      },
    ],
    outro:
      'Se você ainda está em dúvida, conte o seu objetivo e o seu momento. Indicamos o formato mais adequado antes de qualquer proposta.',
  },
  {
    slug: 'o-que-influencia-o-preco-de-um-site',
    title: 'O que influencia o preço de um site profissional',
    description:
      'Escopo, design, funcionalidades, conteúdo e SEO: veja o que faz o preço de um site subir ou descer e como comparar propostas com justiça.',
    category: 'Sites',
    published: '2026-11-21',
    modified: '2026-11-21',
    service: 'sites-institucionais',
    intro: [
      'Não existe um preço único para um site, e vale desconfiar de quem promete um valor fechado sem entender o seu negócio. O que existe são fatores que fazem o investimento subir ou descer. Conhecê-los ajuda a comparar propostas com justiça e a decidir onde vale investir.',
    ],
    sections: [
      {
        h: 'Escopo: quantas páginas e quais',
        p: [
          'Uma página única é diferente de um site com início, páginas por serviço, projetos, blog e contato. Cada página precisa de estrutura, texto, design e testes.',
          'Páginas por serviço também ajudam no SEO, porque cada uma pode aparecer para uma busca específica.',
        ],
      },
      {
        h: 'Design: template ou criado do zero',
        p: [
          'Templates reduzem o custo inicial, mas limitam identidade, desempenho e flexibilidade. Um design feito para a sua marca custa mais, tende a se destacar e costuma carregar mais rápido por não trazer código que você não usa.',
        ],
      },
      {
        h: 'Funcionalidades',
        ul: [
          'Formulários e integração com WhatsApp',
          'Área de login ou painel administrativo',
          'Agendamento online',
          'Pagamentos',
          'Integrações com outros sistemas',
        ],
        p: ['Quanto mais o site se parece com um sistema, mais o projeto se aproxima de desenvolvimento de software.'],
      },
      {
        h: 'Conteúdo: textos, imagens e vídeos',
        p: [
          'Se você já tem textos e fotos de qualidade, o projeto anda mais rápido. Quando é preciso produzir conteúdo, esse trabalho entra na conta, e vale a pena: conteúdo genérico atrapalha tanto a conversão quanto o SEO.',
        ],
      },
      {
        h: 'SEO e desempenho',
        p: [
          'Um site bonito que o Google não entende, ou que demora para abrir, perde visitas. O SEO técnico (estrutura, títulos, dados estruturados e velocidade) deve estar no escopo desde o início, e não ser um extra de última hora.',
        ],
      },
      {
        h: 'Domínio, hospedagem e manutenção',
        p: [
          'Domínio e hospedagem têm custos recorrentes, e o site precisa de atualizações e ajustes ao longo do tempo. Pergunte o que está incluso na proposta e por quanto tempo.',
        ],
      },
      {
        h: 'Como pedir um orçamento comparável',
        ul: [
          'Liste as páginas que você imagina ter',
          'Mostre dois ou três sites que você admira',
          'Diga qual é o objetivo: contatos, vendas ou credibilidade',
          'Informe o prazo desejado',
        ],
      },
    ],
    outro:
      'Com essas informações, qualquer empresa séria consegue montar uma proposta clara, com entregas e prazos. É o que fazemos na Aporte a partir do formulário de orçamento.',
  },
  {
    slug: 'automatizar-atendimento-whatsapp-empresas',
    title: 'Como automatizar o atendimento no WhatsApp da sua empresa',
    description:
      'O que dá para automatizar no WhatsApp, os cuidados com API oficial, consentimento e LGPD, e por onde começar sem perder o toque humano.',
    category: 'Automação',
    published: '2026-11-21',
    modified: '2026-11-21',
    service: 'automacao-de-processos',
    intro: [
      'O WhatsApp é, para muitas empresas brasileiras, o principal canal de vendas e atendimento. O problema aparece quando o volume cresce: mensagens sem resposta, as mesmas informações repetidas o dia inteiro e contatos esquecidos. Automatizar parte desse fluxo libera tempo, mas precisa ser feito com critério.',
    ],
    sections: [
      {
        h: 'O que dá para automatizar',
        ul: [
          'Resposta inicial com horário, serviços e links úteis',
          'Coleta de informações antes do atendimento humano, como nome, necessidade e cidade',
          'Confirmações e lembretes de agendamentos',
          'Avisos para quem pediu para recebê-los',
          'Encaminhamento da conversa para a pessoa certa',
          'Registro automático de contatos em uma planilha ou sistema',
        ],
      },
      {
        h: 'Cuidado com a forma de conectar',
        p: [
          'Existem integrações oficiais, pela API do WhatsApp Business, e soluções não oficiais, que simulam o aplicativo. As não oficiais costumam ser mais baratas para começar, mas podem violar os termos do WhatsApp e levar ao bloqueio do número.',
          'Para uma operação que depende do canal, vale priorizar o caminho oficial.',
        ],
      },
      {
        h: 'Respeite o consentimento e a LGPD',
        p: [
          'Enviar mensagens em massa para quem não pediu é o caminho mais rápido para ser denunciado e perder o número. Automatize o atendimento de quem entrou em contato e o envio para quem autorizou, deixando fácil sair da lista.',
          'Guarde apenas os dados de que precisa e deixe claro para que eles serão usados.',
        ],
      },
      {
        h: 'Por onde começar',
        ul: [
          'Mapeie as cinco perguntas mais repetidas pelos clientes',
          'Defina o que o fluxo responde sozinho e quando chama uma pessoa',
          'Escolha a integração, de preferência a oficial',
          'Conecte com uma planilha ou sistema para não perder contatos',
          'Teste com poucos clientes e ajuste antes de ampliar',
        ],
      },
      {
        h: 'Quando não automatizar',
        p: [
          'Negociações delicadas, reclamações e vendas complexas pedem conversa humana. Uma boa automação sabe a hora de chamar uma pessoa.',
        ],
      },
    ],
    outro:
      'Se você quer tirar essa ideia do papel, a Aporte desenha o fluxo, conecta as ferramentas e deixa tudo funcionando com o seu time.',
  },
]

export const getPost = (slug: string | undefined) => posts.find(item => item.slug === slug)
