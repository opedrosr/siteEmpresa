import type { Faq } from './content.ts'
import type { KindId } from './quote.ts'

export type DemoId = 'site' | 'sistema' | 'automacao'

export type Service = {
  slug: string
  demo: DemoId
  tone: 'orange' | 'ink' | 'paper'
  stack: string
  name: string
  summary: string
  points: string[]
  metaTitle: string
  metaDescription: string
  headline: [string, string]
  intro: string
  kind: KindId
  message: string
  includes: { title: string; text: string }[]
  forWho: string[]
  tech: string[]
  faq: Faq[]
  project: string | null
  comparison: { best: string; format: string }
}

export const services: Service[] = [
  {
    slug: 'sites-institucionais',
    demo: 'site',
    tone: 'orange',
    stack: 'React · SEO',
    name: 'Sites Institucionais',
    summary:
      'A base da presença digital da empresa: várias páginas, estrutura clara e SEO técnico para ser encontrado e passar confiança.',
    points: ['Páginas de serviços, sobre, projetos e contato', 'SEO técnico desde o primeiro dia', 'Funciona muito bem no celular'],
    metaTitle: 'Criação de Sites Institucionais | Aporte',
    metaDescription:
      'Criação de sites institucionais rápidos, responsivos e otimizados para o Google. Páginas de serviços, blog e contato pensados para gerar orçamentos.',
    headline: ['Sites institucionais', 'que passam confiança.'],
    intro:
      'Um site institucional é a base da presença digital de uma empresa: apresenta quem você é, o que faz e leva o visitante até o contato. Construímos com foco em velocidade, clareza e SEO desde o primeiro dia.',
    kind: 'site',
    message: 'Olá! Quero conversar sobre um site institucional para a minha empresa.',
    includes: [
      {
        title: 'Estrutura de páginas planejada',
        text: 'Início, serviços, sobre, projetos, blog e contato organizados para o visitante encontrar o que procura em poucos cliques.',
      },
      {
        title: 'SEO técnico',
        text: 'Títulos e descrições por página, dados estruturados, sitemap, URLs limpas e desempenho medido nos Core Web Vitals.',
      },
      {
        title: 'Design responsivo',
        text: 'Experiência pensada primeiro para o celular e ampliada para tablet e computador.',
      },
      {
        title: 'Captura de contatos',
        text: 'Formulário de orçamento e botões de WhatsApp posicionados onde o visitante decide falar com você.',
      },
      {
        title: 'Blog preparado',
        text: 'Estrutura pronta para publicar artigos que atraem visitas orgânicas e reforçam a sua autoridade.',
      },
      {
        title: 'Acessibilidade e velocidade',
        text: 'Navegação por teclado, contraste adequado e imagens otimizadas para carregar rápido.',
      },
    ],
    forWho: [
      'Empresas que ainda não têm site ou têm um site desatualizado',
      'Prestadores de serviço que querem ser encontrados no Google',
      'Negócios B2B que precisam de credibilidade para fechar vendas',
      'Clínicas, escritórios e profissionais liberais',
    ],
    tech: ['React', 'TypeScript', 'SEO técnico', 'UX/UI'],
    faq: [
      {
        q: 'Qual a diferença entre site institucional e landing page?',
        a: 'A landing page é uma página única, focada em uma ação (pedir orçamento, por exemplo). O site institucional reúne várias páginas e apresenta a empresa por completo, sendo a base para ser encontrado no Google e construir confiança.',
      },
      {
        q: 'O site vai aparecer no Google?',
        a: 'Entregamos o site com SEO técnico bem feito, o que cria as condições para aparecer. A posição nas buscas depende também de conteúdo, concorrência e tempo, por isso não prometemos posições.',
      },
      {
        q: 'Quanto tempo leva para ficar pronto?',
        a: 'Depende do número de páginas, da funcionalidade e de quanto conteúdo já existe. Definimos o cronograma depois da conversa inicial, quando o escopo está claro.',
      },
      {
        q: 'Consigo editar os textos depois?',
        a: 'Sim. Podemos incluir um painel para você editar os textos por conta própria ou combinar as atualizações com a nossa equipe.',
      },
    ],
    project: 'site-estetica-automotiva',
    comparison: { best: 'Ser encontrado no Google e passar credibilidade', format: 'Várias páginas' },
  },
  {
    slug: 'landing-pages',
    demo: 'site',
    tone: 'ink',
    stack: 'React · Conversão',
    name: 'Landing Pages',
    summary:
      'Uma página única, rápida e focada em levar o visitante a uma ação: pedir orçamento, se cadastrar ou chamar no WhatsApp.',
    points: ['Foco total em uma única ação', 'Carregamento rápido no celular', 'Integração com WhatsApp e medição'],
    metaTitle: 'Criação de Landing Pages que Convertem | Aporte',
    metaDescription:
      'Landing pages rápidas e focadas em conversão para campanhas, lançamentos e captação de leads, com SEO técnico, medição e integração com WhatsApp.',
    headline: ['Landing pages', 'feitas para converter.'],
    intro:
      'Quando o objetivo é levar o visitante a uma única ação, uma landing page bem construída é o caminho mais direto. Ela é rápida, clara e desenhada para campanhas, lançamentos e captação de contatos.',
    kind: 'site',
    message: 'Olá! Quero conversar sobre uma landing page para a minha empresa.',
    includes: [
      {
        title: 'Mensagem e estrutura de conversão',
        text: 'Promessa clara no topo, prova, benefícios e chamada para ação organizados na ordem em que o visitante decide.',
      },
      {
        title: 'Carregamento rápido',
        text: 'Páginas leves e otimizadas, importantes tanto para quem vem de anúncios quanto para o Google.',
      },
      {
        title: 'WhatsApp e formulário',
        text: 'Botões e formulário que abrem a conversa já com a mensagem pronta e a origem do contato.',
      },
      {
        title: 'Medição',
        text: 'Preparada para acompanhar visitas e conversões com as ferramentas de análise que você já usa.',
      },
      {
        title: 'Foco no celular',
        text: 'Desenhada primeiro para a tela do celular, de onde vem a maior parte dos acessos.',
      },
      {
        title: 'Base de SEO',
        text: 'Marcação correta, títulos e descrição para que a página também seja entendida pelo Google.',
      },
    ],
    forWho: [
      'Quem vai rodar anúncios e precisa de uma página de destino',
      'Lançamentos, ofertas e campanhas com prazo',
      'Profissionais que querem captar contatos de um serviço específico',
      'Quem quer validar uma ideia antes de investir em um site completo',
    ],
    tech: ['React', 'TypeScript', 'WhatsApp', 'Análise de conversão'],
    faq: [
      {
        q: 'Landing page ou site institucional: qual escolher?',
        a: 'Se o objetivo é testar uma oferta ou rodar anúncios agora, comece pela landing page. Se você quer ser encontrado no Google e transmitir credibilidade no longo prazo, o site institucional é a melhor base. Muitos clientes começam por uma e evoluem para o outro.',
      },
      {
        q: 'A landing page pode virar parte de um site maior depois?',
        a: 'Sim. Construímos de forma que ela possa ser incorporada a um site institucional, aproveitando o mesmo domínio e a mesma identidade.',
      },
      {
        q: 'Vocês cuidam do texto da página?',
        a: 'Ajudamos a estruturar a mensagem a partir do que você vende e de quem é o seu cliente. Quanto mais você nos contar sobre o negócio, melhor fica o resultado.',
      },
    ],
    project: 'site-estetica-automotiva',
    comparison: { best: 'Campanhas, anúncios e captação rápida de contatos', format: 'Página única' },
  },
  {
    slug: 'sistemas-web',
    demo: 'sistema',
    tone: 'paper',
    stack: 'React · Supabase',
    name: 'Sistemas Web sob Medida',
    summary:
      'Ferramentas personalizadas para organizar processos, centralizar informações e trocar planilhas por algo feito para a sua operação.',
    points: ['Agendamentos, pedidos e cadastros', 'Painéis para acompanhar a operação', 'Login, permissões e relatórios'],
    metaTitle: 'Desenvolvimento de Sistemas Web sob Medida | Aporte',
    metaDescription:
      'Desenvolvimento de sistemas web sob medida: agendamento online, cadastros, painéis administrativos e relatórios para organizar a operação da sua empresa.',
    headline: ['Sistemas web', 'sob medida para a sua operação.'],
    intro:
      'Quando planilhas e controles manuais já não dão conta, um sistema feito para o seu processo centraliza as informações e economiza tempo da equipe. Desenvolvemos sistemas web acessíveis de qualquer lugar, no computador e no celular.',
    kind: 'sistema',
    message: 'Olá! Quero conversar sobre um sistema sob medida para a minha empresa.',
    includes: [
      {
        title: 'Agendamento online',
        text: 'O cliente escolhe serviço, data e horário, e o profissional acompanha tudo em um painel próprio.',
      },
      {
        title: 'Cadastros e histórico',
        text: 'Clientes, serviços e pedidos centralizados em um só lugar, com busca e histórico.',
      },
      {
        title: 'Painel administrativo',
        text: 'Uma visão clara da operação, com as informações que você mais consulta ao alcance de um clique.',
      },
      {
        title: 'Login e permissões',
        text: 'Cada pessoa vê e faz apenas o que precisa, com acesso protegido por autenticação.',
      },
      {
        title: 'Relatórios e gráficos',
        text: 'Números da operação organizados para apoiar decisões, sem montar planilha manualmente.',
      },
      {
        title: 'Notificações e pagamentos',
        text: 'Lembretes automáticos e, quando necessário, cobrança online integrada ao sistema.',
      },
    ],
    forWho: [
      'Empresas que controlam clientes e agenda em planilhas ou cadernos',
      'Negócios com processos próprios que ferramentas prontas não atendem bem',
      'Profissionais que precisam de agendamento online com painel',
      'Operações que querem centralizar dados e gerar relatórios',
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    faq: [
      {
        q: 'Por que um sistema sob medida e não uma ferramenta pronta?',
        a: 'Ferramentas prontas são ótimas quando o seu processo é comum. Quando ele tem particularidades, um sistema sob medida evita gambiarras e se adapta a você, em vez do contrário.',
      },
      {
        q: 'O sistema funciona no celular?',
        a: 'Sim. Os sistemas são web e responsivos, acessíveis pelo navegador no celular e no computador. Também é possível configurá-los para funcionar como app na tela inicial.',
      },
      {
        q: 'Meus dados ficam protegidos?',
        a: 'O acesso é protegido por autenticação e as permissões limitam o que cada usuário enxerga. Tratamos segurança como parte do projeto desde o início.',
      },
      {
        q: 'Dá para começar pequeno e crescer?',
        a: 'Dá, e costuma ser o melhor caminho. Começamos pelo processo mais importante e evoluímos o sistema conforme o uso mostra novas necessidades.',
      },
    ],
    project: 'sistema-de-agendamento',
    comparison: { best: 'Organizar processos internos e trocar planilhas', format: 'Sistema com login' },
  },
  {
    slug: 'automacao-de-processos',
    demo: 'automacao',
    tone: 'orange',
    stack: 'APIs · n8n',
    name: 'Automação de Processos',
    summary:
      'Integrações e fluxos automáticos para reduzir tarefas manuais e conectar WhatsApp, planilhas, e-mail e os sistemas que você já usa.',
    points: ['Conectar as ferramentas que você já usa', 'Eliminar tarefas repetitivas', 'Avisos e fluxos automáticos'],
    metaTitle: 'Automação de Processos e Integrações | Aporte',
    metaDescription:
      'Automação de processos com integrações via API, WhatsApp, planilhas e e-mail. Elimine tarefas repetitivas e conecte as ferramentas que sua empresa já usa.',
    headline: ['Automação de processos', 'que devolve o seu tempo.'],
    intro:
      'Copiar dados entre planilhas, responder as mesmas perguntas e lembrar clientes na mão consome horas toda semana. Criamos fluxos que fazem esse trabalho sozinhos e conectam as ferramentas que a sua empresa já usa.',
    kind: 'automacao',
    message: 'Olá! Quero conversar sobre automação de processos na minha empresa.',
    includes: [
      {
        title: 'Integração com WhatsApp',
        text: 'Respostas iniciais, coleta de informações e encaminhamento da conversa para a pessoa certa.',
      },
      {
        title: 'Integração entre sistemas',
        text: 'Conexão por API para os dados circularem sem digitação duplicada.',
      },
      {
        title: 'Planilhas e relatórios automáticos',
        text: 'Registros e relatórios atualizados sozinhos, sem copiar e colar.',
      },
      {
        title: 'Captura e distribuição de contatos',
        text: 'Contatos de formulários e do WhatsApp registrados e encaminhados automaticamente.',
      },
      {
        title: 'Lembretes e notificações',
        text: 'Confirmações, lembretes de agendamento e avisos enviados no momento certo.',
      },
      {
        title: 'E-mails automáticos',
        text: 'Mensagens disparadas por eventos, como um novo pedido ou um novo cadastro.',
      },
    ],
    forWho: [
      'Empresas que respondem muitas mensagens repetidas no WhatsApp',
      'Equipes que passam horas copiando dados entre ferramentas',
      'Negócios com agendamentos que precisam de confirmação e lembrete',
      'Quem quer registrar contatos automaticamente em uma planilha ou sistema',
    ],
    tech: ['n8n', 'APIs', 'WhatsApp', 'Webhooks'],
    faq: [
      {
        q: 'Posso automatizar o WhatsApp da minha empresa?',
        a: 'Pode, e recomendamos o caminho oficial, pela API do WhatsApp Business. Soluções não oficiais costumam ser mais baratas de início, mas podem violar os termos do WhatsApp e levar ao bloqueio do número.',
      },
      {
        q: 'A automação substitui o atendimento humano?',
        a: 'Não. Ela cuida do que é repetitivo e passa a conversa para uma pessoa quando o assunto pede atenção, como negociações e reclamações.',
      },
      {
        q: 'Preciso trocar as ferramentas que já uso?',
        a: 'Na maioria dos casos, não. A ideia é conectar o que você já usa. Só sugerimos trocar algo quando isso realmente simplifica o processo.',
      },
      {
        q: 'Como vocês tratam os dados dos meus clientes?',
        a: 'Guardamos apenas o necessário para o fluxo funcionar e orientamos o uso conforme a LGPD, com consentimento de quem recebe as mensagens.',
      },
    ],
    project: null,
    comparison: { best: 'Eliminar tarefas repetitivas e conectar ferramentas', format: 'Fluxos e integrações' },
  },
]

export const getService = (slug: string | undefined) => services.find(item => item.slug === slug)
