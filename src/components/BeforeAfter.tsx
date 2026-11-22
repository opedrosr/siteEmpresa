import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const beforeImg =
  'https://images.pexels.com/photos/34217562/pexels-photo-34217562.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const afterImg =
  'https://images.pexels.com/photos/3762754/pexels-photo-3762754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function BeforeAfter() {
  const reveal = useScrollReveal();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    if (rect.width === 0) return;

    const percentage =
      ((clientX - rect.left) / rect.width) * 100;

    setPosition(
      Math.max(0, Math.min(100, percentage))
    );
  }, []);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const container = containerRef.current;

    if (!container) return;

    event.preventDefault();

    setIsDragging(true);

    container.setPointerCapture(event.pointerId);

    updatePosition(event.clientX);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    updatePosition(event.clientX);
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const container = containerRef.current;

    setIsDragging(false);

    if (
      container &&
      container.hasPointerCapture(event.pointerId)
    ) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="ba" id="antes-depois">
      <div className="ba-heading reveal" ref={reveal}>
        <p className="section-index">
          10 / antes e depois
        </p>

        <h2>
          a pele
          <br />
          <em>se revela</em>
          <br />
          no tempo.
        </h2>

        <p className="ba-instruction">
          arraste para comparar
        </p>
      </div>

      <div
        ref={(element) => {
          containerRef.current = element;
          reveal(element);
        }}
        className={`ba-slider reveal reveal-delay ${
          isDragging ? 'ba-slider--dragging' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* IMAGEM DEPOIS */}
        <img
          className="ba-after"
          src={afterImg}
          alt="Depois do tratamento"
          draggable={false}
        />

        {/* IMAGEM ANTES */}
        <img
          className="ba-before-img"
          src={beforeImg}
          alt="Antes do tratamento"
          draggable={false}
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        />

        {/* BARRA DE CONTROLE */}
        <div
          className="ba-handle"
          style={{
            left: `${position}%`,
          }}
        >
          <span className="ba-handle-line" />

          <span className="ba-handle-btn">
            <MoveHorizontal
              size={18}
              strokeWidth={1.2}
            />
          </span>

          <span className="ba-handle-line" />
        </div>

        <span className="ba-label ba-label--before">
          antes
        </span>

        <span className="ba-label ba-label--after">
          depois
        </span>
      </div>
    </section>
  );
}