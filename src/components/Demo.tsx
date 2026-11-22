import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'

import type { DemoId } from '../data/services'

export default function Demo({ kind }: { kind: DemoId }) {
  if (kind === 'site') {
    return (
      <div className="demo demo-site" aria-hidden="true">
        <div className="ds-bar"><i /><i /><i /><b /></div>
        <div className="ds-body">
          <span className="ds-h" style={{ '--k': 0 } as CSSProperties} />
          <span className="ds-h short" style={{ '--k': 1 } as CSSProperties} />
          <span className="ds-p" style={{ '--k': 2 } as CSSProperties} />
          <span className="ds-btn" style={{ '--k': 3 } as CSSProperties}>Falar agora</span>
          <div className="ds-row">
            <span style={{ '--k': 4 } as CSSProperties} />
            <span style={{ '--k': 5 } as CSSProperties} />
            <span style={{ '--k': 6 } as CSSProperties} />
          </div>
        </div>
        <svg className="ds-cursor" viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l14 7-6 2-2 6z" /></svg>
      </div>
    )
  }

  if (kind === 'sistema') {
    return (
      <div className="demo demo-sys" aria-hidden="true">
        <div className="dy-head"><span>OUT</span><b>14:30</b></div>
        <div className="dy-cal">
          {Array.from({ length: 21 }).map((_, index) => (
            <span key={index} className={index === 10 ? 'is-pick' : [2, 5, 8, 13, 17].includes(index) ? 'is-busy' : ''} />
          ))}
        </div>
        <div className="dy-bars">
          {[46, 72, 38, 88, 60, 94].map((height, index) => (
            <i key={index} style={{ '--h': `${height}%`, '--k': index } as CSSProperties} />
          ))}
        </div>
        <div className="dy-toast"><Check size={13} /> Agendado</div>
      </div>
    )
  }

  const nodes = [
    { id: 'a', x: 14, y: 22, label: 'FORM' },
    { id: 'b', x: 14, y: 78, label: 'PLAN.' },
    { id: 'c', x: 50, y: 50, label: 'APORTE' },
    { id: 'd', x: 86, y: 22, label: 'ZAP' },
    { id: 'e', x: 86, y: 78, label: 'E-MAIL' },
  ]
  const links: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4]]
  return (
    <div className="demo demo-auto" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {links.map(([from, to], index) => (
        <span
          key={`p-${from}-${to}`}
          className="da-pulse"
          style={
            {
              '--x1': `${nodes[from].x}%`,
              '--y1': `${nodes[from].y}%`,
              '--x2': `${nodes[to].x}%`,
              '--y2': `${nodes[to].y}%`,
              '--d': `${index < 2 ? index * 0.5 : 1.4 + (index - 2) * 0.4}s`,
            } as CSSProperties
          }
        />
      ))}
      {nodes.map(node => (
        <span key={node.id} className={`da-node${node.id === 'c' ? ' is-core' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          {node.label}
        </span>
      ))}
    </div>
  )
}
