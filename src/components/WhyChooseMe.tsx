import { useScrollReveal } from '@/hooks/useScrollReveal';

const reasons = [
  { n: '01', title: 'escuta antes de protocolo', text: 'Cada atendimento começa com uma conversa. O ritual nasce do que sua pele — e você — precisam.' },
  { n: '02', title: 'produtos honestos', text: 'Ativos botânicos selecionados sem promessas vazias. O que funciona, na medida que faz sentido.' },
  { n: '03', title: 'um cuidado só seu', text: 'Ambiente reservado, sem fila, sem pressa. Cada sessão é dedicada inteiramente a você.' },
  { n: '04', title: 'olhar contínuo', text: 'Acompanho a evolução da sua pele ao longo das semanas, ajustando o que for preciso no caminho.' },
];

export default function WhyChooseMe() {
  const reveal = useScrollReveal();

  return (
    <section className="why section-grid" id="porque">
      <div className="why-heading reveal" ref={reveal}>
        <p className="section-index">07 / por que nativa</p>
        <h2>quatro<br /><em>motivos</em><br />para confiar.</h2>
      </div>
      <div className="why-list">
        {reasons.map((r, i) => (
          <article key={r.n} className={`why-item reveal reveal-${i}`} ref={reveal}>
            <span className="why-num">{r.n}</span>
            <div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
