import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Option = { id: string; label: string };
type Step = { question: string; options: Option[] };

const steps: Step[] = [
  {
    question: 'como sua pele se sente ao acordar?',
    options: [
      { id: 'opaca', label: 'opaca e cansada' },
      { id: 'oleosa', label: 'oleosa e brilhante' },
      { id: 'seca', label: 'seca e repuxando' },
      { id: 'ok', label: 'equilibrada, no geral' },
    ],
  },
  {
    question: 'o que mais te incomoda hoje?',
    options: [
      { id: 'sinais', label: 'linhas e flacidez' },
      { id: 'manchas', label: 'manchas e tom irregular' },
      { id: 'textura', label: 'textura e poros' },
      { id: 'sensivel', label: 'sensibilidade e vermelhidão' },
    ],
  },
  {
    question: 'quanto tempo para cuidar de você?',
    options: [
      { id: 'rapido', label: 'pouco — o essencial' },
      { id: 'medio', label: 'uma pausa na semana' },
      { id: 'calmo', label: 'tempo de verdade' },
    ],
  },
];

const results: Record<string, { title: string; text: string; ritual: string }> = {
  default: { title: 'ritual de presença', text: 'Um começo consciente: limpeza, hidratação e massagem para reencontrar o equilíbrio.', ritual: '60 min · R$ 280' },
  sinais: { title: 'ritual antissinais', text: 'Firmeza e viço com manobras autorais e ativos focados em renovação.', ritual: '90 min · R$ 520' },
  manchas: { title: 'peeling de ácidos', text: 'Renovação celular para uniformizar o tom e revelar luminosidade.', ritual: '45 min · R$ 380' },
  textura: { title: 'microagulhamento', text: 'Estímulo de colágeno para afinar poros e suavizar a textura.', ritual: '70 min · R$ 450' },
  sensivel: { title: 'pele em pausa', text: 'Um tratamento restaurador que nutre e acalma a sensibilidade.', ritual: '75 min · R$ 340' },
  seca: { title: 'hidratação profunda', text: 'Carga hídrica com ácido hialurônico para devolver elasticidade.', ritual: '50 min · R$ 290' },
  oleosa: { title: 'limpeza profunda', text: 'Detox facial com extração delicada e finalização calmante.', ritual: '50 min · R$ 260' },
};

function pickResult(answers: string[]) {
  const match = answers.find((a) => results[a]);
  return match ? results[match] : results.default;
}

export default function BeautyMatch() {
  const reveal = useScrollReveal();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const progress = finished ? 100 : (stepIndex / steps.length) * 100;

  const choose = (optionId: string) => {
    setSelected(optionId);
    setTimeout(() => {
      const nextAnswers = [...answers, optionId];
      setAnswers(nextAnswers);
      setSelected(null);
      if (stepIndex + 1 < steps.length) {
        setStepIndex(stepIndex + 1);
      } else {
        setFinished(true);
      }
    }, 320);
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
  };

  const result = finished ? pickResult(answers) : null;

  return (
    <section className="match" id="match">
      <div className="match-inner reveal" ref={reveal}>
        <p className="section-index">09 / beauty match</p>
        {!finished && (
          <>
            <div className="match-progress">
              <div className="match-progress-bar" style={{ width: `${progress}%` }} />
              <span className="match-step">etapa {stepIndex + 1} de {steps.length}</span>
            </div>
            <h2 className="match-question">{steps[stepIndex].question}</h2>
            <div className="match-options">
              {steps[stepIndex].options.map((opt) => (
                <button
                  key={opt.id}
                  className={`match-option ${selected === opt.id ? 'match-option--active' : ''}`}
                  onClick={() => choose(opt.id)}
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={15} strokeWidth={1.2} />
                </button>
              ))}
            </div>
          </>
        )}
        {finished && result && (
          <div className="match-result">
            <p className="match-result-label">seu ritual</p>
            <h2 className="match-result-title">{result.title}</h2>
            <p className="match-result-text">{result.text}</p>
            <p className="match-result-meta">{result.ritual}</p>
            <div className="match-result-actions">
              <a className="outline-button" href="#contato">agendar este ritual <ArrowRight size={15} strokeWidth={1.2} /></a>
              <button className="match-restart" onClick={restart}><RotateCcw size={13} strokeWidth={1.3} /> refazer</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
