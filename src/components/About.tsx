import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal, useParallax } from '@/hooks/useScrollReveal';

const aboutImage = 'https://images.pexels.com/photos/16120490/pexels-photo-16120490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const aboutDetail = 'https://images.pexels.com/photos/7581082/pexels-photo-7581082.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function About() {
  const reveal = useScrollReveal();
  const { ref: imgRef, offset } = useParallax(0.03);

  return (
    <section className="about section-grid" id="sobre">
      <div className="about-copy reveal" ref={reveal}>
        <p className="section-index">06 / sobre</p>
        <h2>a mão<br /><em>por trás</em><br />do toque.</h2>
        <p className="body-copy">Sou Letícia Nativa, esteticista há mais de doze anos. Minha prática nasce da escuta: entender a pele de cada pessoa antes de propor qualquer caminho.</p>
        <p className="body-copy about-copy-second">Acredito em tratamento devagar, ativos honestos e na beleza que aparece quando a pele encontra seu equilíbrio.</p>
        <a className="text-link" href="#contato">conversar comigo <ArrowUpRight size={15} strokeWidth={1.3} /></a>
      </div>
      <div className="about-visual">
        <div className="about-main image-wrap reveal reveal-delay" ref={reveal}>
          <img ref={imgRef as React.RefObject<HTMLImageElement>} src={aboutImage} alt="Esteticista realizando tratamento facial" style={{ transform: `translateY(${offset}px)` }} />
        </div>
        <div className="about-detail image-wrap reveal" ref={reveal}>
          <img src={aboutDetail} alt="Detalhe do toque durante o procedimento" />
          <span className="image-caption">doze anos de prática</span>
        </div>
      </div>
    </section>
  );
}
