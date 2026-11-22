import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  { q: 'qual a duração de cada sessão?', a: 'Os rituais variam entre 45 e 90 minutos. O tempo exato depende do protocolo escolhido após a conversa inicial.' },
  { q: 'preciso preparar a pele antes?', a: 'Não. Apenas venha sem maquiagem se possível. Tudo o que sua pele precisar é cuidado aqui no ateliê.' },
  { q: 'com que frequência devo retornar?', a: 'Na maioria dos casos, sessões mensais mantêm os resultados. Tratamentos específicos podem ter um calendário próprio.' },
  { q: 'os produtos são veganos?', a: 'Sim. Trabalho com marcas que não testam em animais e utilizam ativos botânicos em sua maioria vegana.' },
  { q: 'há contraindicações?', a: 'Condições específicas como pele muito sensível, gravidez ou tratamentos médicos são avaliadas antes de qualquer protocolo.' },
];

export default function FAQ() {
  const reveal = useScrollReveal();
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="faq-heading reveal" ref={reveal}>
        <p className="section-index">13 / perguntas</p>
        <h2>antes<br /><em>de vir.</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className={`faq-item reveal reveal-${i % 3}`} ref={reveal}>
            <button className={`faq-question ${open === i ? 'faq-question--open' : ''}`} onClick={() => toggle(i)} aria-expanded={open === i}>
              <span>{item.q}</span>
              <span className="faq-icon"><Plus size={16} strokeWidth={1.3} /></span>
            </button>
            <div className={`faq-answer ${open === i ? 'faq-answer--open' : ''}`}>
              <div className="faq-answer-inner"><p>{item.a}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
