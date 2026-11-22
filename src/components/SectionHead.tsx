import Reveal from './Reveal'
import Words from './Words'

export default function SectionHead({
  kicker,
  title,
  accent,
  lede,
}: {
  kicker: string
  title: string
  accent?: string
  lede?: string
}) {
  return (
    <Reveal className="section-head">
      <span className="kicker">{kicker}</span>
      <h2 className="section-title">
        <Words text={title} />
        {accent && (
          <em>
            <Words text={accent} from={title.split(' ').length} />
          </em>
        )}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  )
}
