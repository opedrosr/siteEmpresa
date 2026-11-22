import type { ReactNode } from 'react'

import { whatsapp } from '../data/site'

export default function WhatsAppLink({
  message,
  className = 'btn btn-ghost',
  children,
  onClick,
}: {
  message?: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <a
      className={className}
      href={whatsapp(message)}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
