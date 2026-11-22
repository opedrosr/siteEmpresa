export type KindId = 'site' | 'sistema' | 'automacao' | 'duvida'

export type Feature = { id: string; label: string; code: string }

export const kinds: { id: KindId; label: string; need: string }[] = [
  { id: 'site', label: 'Site', need: 'Site ou landing page' },
  { id: 'sistema', label: 'Sistema', need: 'Sistema' },
  { id: 'automacao', label: 'Automação', need: 'Automação' },
  { id: 'duvida', label: 'Ainda não sei', need: 'Ainda não sei o que preciso' },
]

export const featuresByKind: Record<KindId, Feature[]> = {
  site: [
    { id: 'landing', label: 'Página única (landing)', code: 'LANDING' },
    { id: 'paginas', label: 'Várias páginas', code: 'PÁGINAS' },
    { id: 'form', label: 'Formulário de contato', code: 'FORM' },
    { id: 'zap', label: 'Botão de WhatsApp', code: 'ZAP' },
    { id: 'galeria', label: 'Galeria / portfólio', code: 'GALERIA' },
    { id: 'blog', label: 'Blog ou novidades', code: 'BLOG' },
    { id: 'editar', label: 'Painel para editar textos', code: 'EDITOR' },
    { id: 'seo', label: 'SEO e velocidade', code: 'SEO' },
  ],
  sistema: [
    { id: 'login', label: 'Login de clientes', code: 'LOGIN' },
    { id: 'agenda', label: 'Agendamento online', code: 'AGENDA' },
    { id: 'painel', label: 'Painel administrativo', code: 'PAINEL' },
    { id: 'cadastro', label: 'Cadastro de clientes', code: 'CADASTRO' },
    { id: 'relatorios', label: 'Relatórios e gráficos', code: 'DADOS' },
    { id: 'pagamento', label: 'Pagamentos online', code: 'PAGAR' },
    { id: 'avisos', label: 'Notificações e lembretes', code: 'AVISOS' },
    { id: 'pwa', label: 'Funciona como app no celular', code: 'APP' },
  ],
  automacao: [
    { id: 'whats', label: 'Integração com WhatsApp', code: 'ZAP' },
    { id: 'planilhas', label: 'Planilhas automáticas', code: 'PLANILHA' },
    { id: 'lembretes', label: 'Avisos e lembretes', code: 'AVISOS' },
    { id: 'sistemas', label: 'Sistemas que já uso', code: 'SISTEMAS' },
    { id: 'email', label: 'Envio de e-mails', code: 'E-MAIL' },
    { id: 'leads', label: 'Captura de contatos', code: 'LEADS' },
    { id: 'relatorio', label: 'Relatórios automáticos', code: 'RELATÓR.' },
    { id: 'api', label: 'Conexão via API', code: 'API' },
  ],
  duvida: [],
}

export const isKindId = (value: string | null): value is KindId =>
  value === 'site' || value === 'sistema' || value === 'automacao' || value === 'duvida'
