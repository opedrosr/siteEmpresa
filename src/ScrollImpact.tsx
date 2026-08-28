import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function ScrollImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalDistance = section.offsetHeight - viewportHeight;
      const currentDistance = -rect.top;

      const rawProgress =
        totalDistance > 0
          ? currentDistance / totalDistance
          : 0;

      const clampedProgress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setProgress(clampedProgress);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const rotation = progress * 360;
  const scale = 0.72 + progress * 2.15;
  const orbRotation = progress * -180;
  const glowOpacity = 0.2 + progress * 0.8;
  const orbBorderRadius = `${46 + progress * 25}% ${54 - progress * 20}% ${
    42 + progress * 18
  }% ${58 - progress * 22}%`;

  return (
    <section
      ref={sectionRef}
      className="scroll-impact"
      style={
        {
          '--impact-progress': progress,
          '--impact-rotation': `${rotation}deg`,
          '--impact-scale': scale,
          '--impact-orb-rotation': `${orbRotation}deg`,
          '--impact-glow': glowOpacity,
          '--impact-radius': orbBorderRadius,
        } as React.CSSProperties
      }
    >
      <div className="scroll-impact-sticky">
        <div className="scroll-impact-background">
          <div className="impact-grid" />
          <div className="impact-glow impact-glow-left" />
          <div className="impact-glow impact-glow-right" />
        </div>

        <div className="impact-content">
          <div className="impact-label">
            <span className="impact-label-dot" />
            <span>03 / EXPERIENCE</span>
          </div>

          <div className="impact-heading">
            <p>DESIGN THAT</p>
            <h2>
              MOVES
              <em> WITH YOU.</em>
            </h2>
          </div>

          <p className="impact-description">
            Uma experiência construída para transformar o scroll
            em parte da identidade da marca.
          </p>

          <div className="impact-scroll-indicator">
            <ArrowDown size={14} />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        <div className="impact-object-area">
          <div
            className="impact-orbit impact-orbit-one"
            aria-hidden="true"
          />

          <div
            className="impact-orbit impact-orbit-two"
            aria-hidden="true"
          />

          <div
            className="impact-orbit impact-orbit-three"
            aria-hidden="true"
          />

          <div className="impact-line impact-line-one" />
          <div className="impact-line impact-line-two" />
          <div className="impact-line impact-line-three" />

          <div className="impact-object">
            <div className="impact-object-inner">
              <div className="impact-object-core">
                <span />
              </div>

              <div className="impact-object-ring ring-one" />
              <div className="impact-object-ring ring-two" />

              <div className="impact-object-symbol">
                <ArrowUpRight size={28} strokeWidth={1.2} />
              </div>
            </div>
          </div>

          <div className="impact-data impact-data-top">
            <span>SCROLL</span>
            <strong>
              {Math.round(progress * 100)
                .toString()
                .padStart(3, '0')}
              %
            </strong>
          </div>

          <div className="impact-data impact-data-bottom">
            <span>ROTATION</span>
            <strong>{Math.round(rotation)}°</strong>
          </div>
        </div>

        <div className="impact-bottom">
          <span>INTERACTION / 001</span>
          <span>KEEP SCROLLING</span>
        </div>
      </div>
    </section>
  );
}