import { bandItems } from '../data/content'

export default function Band({ tone, reverse }: { tone: 'orange' | 'ink'; reverse?: boolean }) {
  const row = Array.from({ length: 3 }).flatMap((_, round) =>
    bandItems.map(item => (
      <span key={`${round}-${item}`} className="band-item">
        {item}
        <i aria-hidden="true" />
      </span>
    )),
  )
  return (
    <div className={`band band-${tone}${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
      <div className="band-track">
        <div className="band-row">{row}</div>
        <div className="band-row">{row}</div>
      </div>
    </div>
  )
}
