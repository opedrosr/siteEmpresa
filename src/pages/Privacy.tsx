import PageHero from '../components/PageHero'
import { SITE, whatsapp } from '../data/site'

export default function Privacy() {
  return (
    <>
      <PageHero
        kicker="legal"
        title="Política de"
        accent="privacidade."
        lede="Explicamos de forma direta quais dados passam por este site e como você pode exercer os seus direitos pela LGPD."
        crumbs={[{ label: 'Privacidade' }]}
      />

      <section className="section theme-light">
        <div className="wrap">
          <article className="prose">
            <p className="prose-intro">Última atualização: 21 de novembro de 2026.</p>

            <section>
              <h2>Quem somos</h2>
              <p>
                Este site é mantido pela {SITE.name}, software house com base em {SITE.address.locality},{' '}
                {SITE.address.region}. Falamos aqui em nome da {SITE.name} como controladora dos dados tratados neste
                site.
              </p>
            </section>

            <section>
              <h2>Quais dados tratamos</h2>
              <ul>
                <li>
                  <strong>Formulário de orçamento:</strong> o nome, o tipo de projeto, os módulos e a mensagem que você
                  preencher são usados apenas para montar o texto da conversa no WhatsApp. Eles não são enviados nem
                  armazenados por este site; só chegam até nós se você tocar em enviar no WhatsApp.
                </li>
                <li>
                  <strong>Conversas no WhatsApp:</strong> ao falar conosco, o WhatsApp trata o seu número e as mensagens
                  conforme os termos e a política de privacidade do próprio serviço.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> o servidor que hospeda o site pode registrar dados técnicos
                  básicos de acesso (como endereço IP e tipo de navegador) por motivos de segurança e funcionamento.
                </li>
              </ul>
            </section>

            <section>
              <h2>Para que usamos os dados</h2>
              <p>
                Usamos as informações que você nos envia para responder ao seu contato, entender o que você precisa e
                preparar uma proposta. Não vendemos dados pessoais.
              </p>
            </section>

            <section>
              <h2>Seus direitos</h2>
              <p>
                Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir acesso, correção ou exclusão dos dados que
                tenhamos sobre você, além de informações sobre o tratamento. Para isso, fale conosco pelo{' '}
                <a href={whatsapp('Olá! Quero exercer meus direitos sobre dados pessoais (LGPD).')} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Atualizações desta política</h2>
              <p>
                Podemos atualizar esta política quando o site mudar, por exemplo, ao incluir ferramentas de análise ou
                formulários. A data no topo da página indica a última revisão.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
