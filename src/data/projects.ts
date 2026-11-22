export type Project = {
  slug: string
  id: string
  name: string
  type: string
  summary: string
  description: string
  metaTitle: string
  metaDescription: string
  tags: string[]
  image: string
  imageAlt: string
  video: string
  gallery: { src: string; alt: string }[]
  features: string[]
  service: string
}

export const projects: Project[] = [
  {
    slug: 'sistema-de-agendamento',
    id: '01',
    name: 'Sistema de Agendamento',
    type: 'Sistema',
    summary:
      'Clientes escolhem serviços e horários, e o profissional acompanha os agendamentos em um ambiente próprio.',
    description:
      'Sistema de agendamento desenvolvido para permitir que clientes escolham serviços e horários enquanto o profissional acompanha seus agendamentos em um ambiente próprio.',
    metaTitle: 'Sistema de Agendamento Online | Projeto Aporte',
    metaDescription:
      'Conheça o sistema de agendamento online desenvolvido pela Aporte com React e Supabase: escolha de serviço e horário e painel para o profissional.',
    tags: ['Sistema', 'React', 'Supabase', 'Agendamento'],
    image: '/agendamento-01-inicio.png',
    imageAlt: 'Tela inicial do sistema de agendamento online',
    video: '/agendamento-demo.mp4',
    gallery: [
      { src: '/agendamento-01-inicio.png', alt: 'Sistema de agendamento: tela inicial' },
      { src: '/agendamento-02-servicos.png', alt: 'Sistema de agendamento: escolha do serviço' },
      { src: '/agendamento-03-horarios.png', alt: 'Sistema de agendamento: seleção de data e horário' },
      { src: '/agendamento-04-confirmacao.png', alt: 'Sistema de agendamento: confirmação do agendamento' },
      { src: '/agendamento-05-painel.png', alt: 'Sistema de agendamento: painel do profissional' },
    ],
    features: [
      'Escolha do serviço desejado pelo cliente',
      'Seleção de data e horário',
      'Tela de confirmação do agendamento',
      'Painel para o profissional acompanhar os agendamentos',
    ],
    service: 'sistemas-web',
  },
  {
    slug: 'site-estetica-automotiva',
    id: '02',
    name: 'Site de Estética Automotiva',
    type: 'Website',
    summary:
      'Site com foco em apresentação visual, interação e serviços, conduzindo o visitante até o contato.',
    description:
      'Site desenvolvido para uma empresa de estética automotiva, com foco em apresentação visual, interação, serviços e condução do visitante até o contato.',
    metaTitle: 'Site para Estética Automotiva | Projeto Aporte',
    metaDescription:
      'Veja o site criado pela Aporte para uma empresa de estética automotiva: visual forte, interação, serviços, antes e depois e contato direto.',
    tags: ['Website', 'UX/UI', 'Interação', 'Mobile'],
    image: '/automotivo-hero-interacao.png',
    imageAlt: 'Início do site de estética automotiva com elemento interativo',
    video: '/automotivo-demo.mp4',
    gallery: [
      { src: '/automotivo-hero-interacao.png', alt: 'Site de estética automotiva: início com elemento interativo' },
      { src: '/automotivo-03-servicos.png', alt: 'Site de estética automotiva: seção de serviços' },
      { src: '/automotivo-antes-depois.png', alt: 'Site de estética automotiva: comparativo de antes e depois' },
      { src: '/automotivo-contato.png', alt: 'Site de estética automotiva: seção de contato' },
    ],
    features: [
      'Início com elemento interativo para chamar atenção',
      'Seção de serviços clara e fácil de percorrer',
      'Comparativo de antes e depois',
      'Contato direto com a empresa',
      'Layout pensado para o celular',
    ],
    service: 'sites-institucionais',
  },
]

export const getProject = (slug: string | undefined) => projects.find(item => item.slug === slug)
