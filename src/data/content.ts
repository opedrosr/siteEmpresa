export type Faq = { q: string; a: string }

export const bandItems = ['Sites', 'Sistemas', 'Automação', 'UX/UI', 'Mobile first']

export const processSteps = [
  {
    number: '01',
    title: 'Entendimento',
    text: 'Começamos entendendo o negócio, o objetivo e o problema que precisa ser resolvido.',
    details: [
      'Conversa inicial sobre o negócio, o público e os objetivos',
      'Levantamento do que já existe e do que precisa ser resolvido',
      'Definição do que entra (e do que fica de fora) neste primeiro momento',
    ],
  },
  {
    number: '02',
    title: 'Estratégia',
    text: 'Definimos estrutura, experiência e tecnologia de acordo com o cenário real.',
    details: [
      'Estrutura de páginas ou fluxos do sistema',
      'Escolha da tecnologia conforme o cenário real, sem ferramentas a mais',
      'Plano de SEO e de medição, quando se aplica',
    ],
  },
  {
    number: '03',
    title: 'Construção',
    text: 'Transformamos a estratégia em uma solução com design, tecnologia e atenção aos detalhes.',
    details: [
      'Design e desenvolvimento com revisões ao longo do caminho',
      'Testes em celular, tablet e computador',
      'Ajustes finais antes da publicação',
    ],
  },
  {
    number: '04',
    title: 'Evolução',
    text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.',
    details: [
      'Publicação e acompanhamento nos primeiros momentos',
      'Ajustes com base no uso real',
      'Novas funcionalidades conforme a necessidade do negócio',
    ],
  },
]

export const principles = [
  { title: 'Começamos pelo problema', text: 'Antes de desenhar ou programar, entendemos o negócio e o que precisa ser resolvido.' },
  { title: 'Tudo tem uma função', text: 'Cada tela, botão e automação existe para ajudar o negócio, não só para enfeitar.' },
  { title: 'Feito para evoluir', text: 'A solução nasce preparada para acompanhar novas necessidades e oportunidades.' },
]

export const tools = [
  {
    name: 'React',
    text: 'Interfaces rápidas e fluidas',
    long: 'Construímos interfaces em componentes reutilizáveis, o que acelera a entrega e facilita a evolução do projeto.',
  },
  {
    name: 'TypeScript',
    text: 'Código mais seguro e fácil de manter',
    long: 'A tipagem detecta erros antes de o código chegar ao ar e deixa o projeto mais fácil de entender para quem vier depois.',
  },
  {
    name: 'Supabase',
    text: 'Banco de dados, login e backend',
    long: 'Banco de dados PostgreSQL, autenticação e armazenamento prontos para sistemas com login, cadastros e painéis.',
  },
  {
    name: 'APIs',
    text: 'Conexão entre sistemas e serviços',
    long: 'Conectamos o seu projeto a pagamentos, WhatsApp, e-mail e a outros sistemas que a empresa já usa.',
  },
  {
    name: 'Automação (n8n)',
    text: 'Fluxos que eliminam trabalho manual',
    long: 'Fluxos automáticos que movem dados entre ferramentas, enviam avisos e registram contatos sem trabalho manual.',
  },
  {
    name: 'UX/UI',
    text: 'Design pensado para quem usa',
    long: 'Interfaces claras, acessíveis e pensadas primeiro para o celular, porque é por lá que a maioria dos clientes chega.',
  },
]

export const generalFaq: Faq[] = [
  {
    q: 'A Aporte atende empresas de qualquer lugar do Brasil?',
    a: 'Sim. O trabalho é feito de forma remota, com conversas por vídeo e acompanhamento pelo WhatsApp. A base da Aporte fica em Contagem, MG.',
  },
  {
    q: 'Qual a diferença entre uma software house e uma agência de sites?',
    a: 'Uma agência costuma focar em presença digital e marca. Uma software house também desenvolve sistemas, integrações e automações, ou seja, software que passa a fazer parte da operação da empresa, além do site.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'Você conta o que precisa pelo formulário de orçamento ou pelo WhatsApp. Com base no escopo, enviamos uma proposta com o que será entregue e os prazos. Cada projeto tem necessidades diferentes, por isso o valor depende do que será construído.',
  },
  {
    q: 'O site é feito para aparecer no Google?',
    a: 'Todo projeto nasce com SEO técnico: estrutura de páginas, títulos, dados estruturados, sitemap e velocidade. Os resultados nas buscas dependem também de conteúdo, concorrência e tempo, por isso não prometemos posições.',
  },
  {
    q: 'Existe acompanhamento depois da entrega?',
    a: 'Sim. A evolução faz parte do processo: depois da entrega, é possível combinar ajustes e novas funcionalidades conforme a necessidade do negócio.',
  },
  {
    q: 'Posso ver exemplos do que já foi feito?',
    a: 'Pode. Na página de projetos você encontra telas e vídeos de demonstração de um sistema de agendamento e de um site de estética automotiva.',
  },
]
