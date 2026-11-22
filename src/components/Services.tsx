import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  { n: '01', title: 'limpeza de pele profunda', text: 'Detox facial com extração delicada, esfoliação e finalização calmante.', price: 'R$ 260', time: '50 min' },
  { n: '02', title: 'massagem modeladora facial', text: 'Manobras de drenagem e modelagem para definir o contorno e soltar a tensão.', price: 'R$ 320', time: '60 min' },
  { n: '03', title: 'microagulhamento', text: 'Estímulo de colágeno para renovar a textura e atenuar marcas.', price: 'R$ 450', time: '70 min' },
  { n: '04', title: 'peeling de ácidos', text: 'Renovação celular controlada para uniformizar tom e luminosidade.', price: 'R$ 380', time: '45 min' },
  { n: '05', title: 'hidratação facial profunda', text: 'Carga hídrica com ácido hialurônico e ativos restauradores.', price: 'R$ 290', time: '50 min' },
  { n: '06', title: 'ritual antissinais', text: 'Tratamento autorais focado em firmeza, viço e atenuação de linhas.', price: 'R$ 520', time: '90 min' },
];

export default function Services() {
  const reveal = useScrollReveal();

  return (
    <section className="services" id="servicos">
      <div className="services-heading reveal" ref={reveal}>
        <p className="section-index">08 / serviços</p>
        <h2>tudo<br /><em>para sua pele.</em></h2>
        <a className="text-link" href="#match">encontre seu tratamento <ArrowUpRight size={15} strokeWidth={1.3} /></a>
      </div>
      <div className="services-list">
        {services.map((s, i) => (
          <article key={s.n} className={`service-item reveal reveal-${i}`} ref={reveal}>
            <div className="service-top">
              <span className="service-num">{s.n}</span>
              <span className="service-price">{s.price}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className="service-time">{s.time}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
