import { useEffect, useState } from 'react';
import { WhatsAppIcon } from '@/components/icons';

export default function WhatsAppFloating() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const phone = '5511999999999';
  const message = encodeURIComponent('Olá! Gostaria de agendar uma avaliação.');
  const href = `https://wa.me/${phone}?text=${message}`;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      className={`wa-float ${visible ? 'wa-float--visible' : ''} ${hovered ? 'wa-float--hover' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="wa-float-pulse" />
      <span className="wa-float-icon"><WhatsAppIcon size={22} strokeWidth={1.4} /></span>
      <span className="wa-float-label">agende pelo whatsapp</span>
    </a>
  );
}
