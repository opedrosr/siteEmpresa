import { useScrollReveal } from '@/hooks/useScrollReveal';

const moments = [
  { n: '01', title: 'chegada', text: 'Você é recebida com um chá e uma conversa. Nada começa antes de entender o que sua pele pede.', image: 'https://images.pexels.com/photos/6560308/pexels-photo-6560308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', side: 'left' },
  { n: '02', title: 'preparo', text: 'Limpeza inicial e análise sob luz natural. O protocolo se ajusta ao que observamos juntos.', image: 'https://images.pexels.com/photos/7581088/pexels-photo-7581088.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', side: 'right' },
  { n: '03', title: 'ritual', text: 'O tratamento se desenrola devagar. Manobras, ativos e silêncio para a pele responder.', image: 'https://images.pexels.com/photos/37229280/pexels-photo-37229280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', side: 'left' },
  { n: '04', title: 'retorno', text: 'Você sai com a pele cuidada e um plano simples para os próximos dias. O cuidado continua em casa.', image: 'https://images.pexels.com/photos/7815016/pexels-photo-7815016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', side: 'right' },
];

export default function Experience() {
  const reveal = useScrollReveal();

  return (
    <section className="experience" id="experiencia">
      <div className="experience-intro reveal" ref={reveal}>
        <p className="section-index">11 / a experiência</p>
        <h2>do chá<br /><em>ao retorno.</em></h2>
      </div>
      <div className="experience-timeline">
        {moments.map((m, i) => (
          <article key={m.n} className={`exp-moment exp-moment--${m.side} reveal reveal-${i}`} ref={reveal}>
            <div className="exp-moment-image image-wrap"><img src={m.image} alt={`Momento ${m.title}`} /></div>
            <div className="exp-moment-text">
              <span className="exp-num">{m.n}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
