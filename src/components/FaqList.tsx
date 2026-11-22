import { Plus } from 'lucide-react'

import type { Faq } from '../data/content'

// <details> nativo: acessível, funciona sem JavaScript e o texto fica no HTML para os buscadores.
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map(item => (
        <details key={item.q}>
          <summary>
            <span>{item.q}</span>
            <Plus size={22} aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
