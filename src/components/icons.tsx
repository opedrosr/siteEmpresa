export function WhatsAppIcon({ size = 20, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Z" />
      <path d="M8.5 8.2c.2-.4.4-.4.6-.4h.4c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3 0 .6.3.5.7 1.1 1.3 1.6.8.7 1.4.9 1.7 1 .3.1.4 0 .6-.2l.4-.5c.2-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.4 0 .2 0 .8-.3 1.2-.3.5-1.2.9-1.7 1-.5.1-1.1.1-2.7-.6-2-.9-3.3-2.9-3.4-3.1-.1-.2-.8-1.1-.8-2.1 0-1 .5-1.5.7-1.7.2-.2.4-.3.6-.3Z" />
    </svg>
  );
}
