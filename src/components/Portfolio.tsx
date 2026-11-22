import { useScrollReveal, useParallax } from '@/hooks/useScrollReveal';

const portfolio = [
  { image: 'https://images.pexels.com/photos/3762754/pexels-photo-3762754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', caption: 'glow natural', span: 'tall' },
  { image: 'https://images.pexels.com/photos/31403887/pexels-photo-31403887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', caption: 'textura renovada', span: 'short' },
  { image: 'https://images.pexels.com/photos/6732390/pexels-photo-6732390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', caption: 'máscara calmante', span: 'short' },
  { image: 'https://images.pexels.com/photos/3762758/pexels-photo-3762758.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', caption: 'pele equilibrada', span: 'tall' },
  { image: 'https://images.pexels.com/photos/7670768/pexels-photo-7670768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', caption: 'texturas botânicas', span: 'tall' },
];

export default function Portfolio() {
  const reveal = useScrollReveal();
  const { ref: parallaxRef, offset } = useParallax(0.025);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-heading reveal" ref={reveal}>
        <p className="section-index">12 / portfólio</p>
        <h2>cada pele,<br /><em>uma história.</em></h2>
      </div>
      <div className="portfolio-grid">
        {portfolio.map((item, i) => (
          <figure key={i} className={`portfolio-item portfolio-item--${item.span} reveal reveal-${i % 3}`} ref={reveal}>
            <div className="image-wrap">
              <img
                ref={i === 1 ? parallaxRef as React.RefObject<HTMLImageElement> : undefined}
                src={item.image}
                alt={item.caption}
                style={i === 1 ? { transform: `translateY(${offset}px)` } : undefined}
              />
              <figcaption>{item.caption}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
