import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, MessageCircle } from 'lucide-react'

import { featuresByKind, kinds } from '../data/quote'
import type { Feature, KindId } from '../data/quote'
import { GENERIC_MESSAGE, whatsapp } from '../data/site'

// Diagrama do briefing: cada módulo escolhido "acende" e liga ao centro.
function Blueprint({ features, selected }: { features: Feature[]; selected: string[] }) {
  const cx = 220
  const cy = 210
  const radius = 150
  return (
    <svg
      className="blueprint"
      viewBox="0 0 440 420"
      role="img"
      aria-label={`Diagrama do projeto com ${selected.length} de ${features.length} módulos`}
    >
      <circle cx={cx} cy={cy} r={radius} className="bp-orbit" />
      <circle cx={cx} cy={cy} r={radius * 0.6} className="bp-orbit bp-inner" />
      <path d={`M${cx - 190} ${cy}H${cx + 190}M${cx} ${cy - 190}V${cy + 190}`} className="bp-axis" />
      {features.map((feature, index) => {
        const angle = (Math.PI * 2 * index) / features.length - Math.PI / 2
        const x = cx + radius * Math.cos(angle)
        const y = cy + radius * Math.sin(angle)
        const on = selected.includes(feature.id)
        const above = y < cy - 1
        return (
          <g key={feature.id} className={`bp-node${on ? ' is-on' : ''}`}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="bp-line" pathLength={1} />
            <circle cx={x} cy={y} r={on ? 15 : 10} className="bp-dot" />
            {on && <path d={`M${x - 5} ${y}l3.6 3.8L${x + 5.5} ${y - 4}`} className="bp-check" />}
            <text x={x} y={above ? y - 24 : y + 33} textAnchor="middle" className="bp-label">
              {feature.code}
            </text>
          </g>
        )
      })}
      <g className="bp-core">
        <circle cx={cx} cy={cy} r={42} />
        <circle cx={cx} cy={cy} r={54} className="bp-ring" />
        <text x={cx} y={cy + 4} textAnchor="middle">APORTE</text>
      </g>
    </svg>
  )
}

export default function QuoteBuilder({ initialKind = 'sistema' }: { initialKind?: KindId }) {
  const [kind, setKind] = useState<KindId>(initialKind)
  const [picked, setPicked] = useState<string[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const features = featuresByKind[kind]
  const currentKind = kinds.find(item => item.id === kind) ?? kinds[0]

  const chooseKind = (id: KindId) => {
    setKind(id)
    setPicked([])
  }

  const toggleFeature = (id: string) =>
    setPicked(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const chosen = features.filter(feature => picked.includes(feature.id)).map(feature => feature.label)
    const lines = [`Olá! Me chamo ${name.trim()}.`, `Quero: ${currentKind.need}.`]
    if (chosen.length) lines.push(`Módulos: ${chosen.join(', ')}.`)
    if (message.trim()) lines.push('', message.trim())
    window.open(whatsapp(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="builder" onSubmit={handleSubmit}>
      <div className="builder-controls">
        <fieldset className="b-step">
          <legend><b>1</b> O que você precisa?</legend>
          <div className="kind-grid">
            {kinds.map(item => (
              <label key={item.id} className="kind">
                <input
                  type="radio"
                  name="tipo"
                  value={item.id}
                  checked={kind === item.id}
                  onChange={() => chooseKind(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="b-step">
          <legend><b>2</b> O que ele precisa ter?</legend>
          {features.length > 0 ? (
            <div className="feature-grid">
              {features.map(feature => {
                const on = picked.includes(feature.id)
                return (
                  <button
                    key={feature.id}
                    type="button"
                    className={`feature${on ? ' is-on' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggleFeature(feature.id)}
                  >
                    <span className="feature-box" aria-hidden="true">{on && <Check size={14} />}</span>
                    {feature.label}
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="b-empty">Sem problema. Conte sua ideia no passo 3 e a gente descobre juntos o melhor caminho.</p>
          )}
        </fieldset>

        <fieldset className="b-step">
          <legend><b>3</b> Fale com a gente</legend>
          <div className="field">
            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Como podemos te chamar?"
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="mensagem">
              Conte um pouco sobre a ideia <small>(opcional)</small>
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={3}
              placeholder="Ex.: quero um sistema para agendar meus clientes."
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary btn-block btn-lg" data-magnetic>
          <MessageCircle size={20} aria-hidden="true" /> Enviar pelo WhatsApp
        </button>
        <p className="form-note">
          Vai abrir o WhatsApp com a mensagem pronta. Nada é salvo neste site; só você decide enviar.
        </p>
        <p className="form-alt">
          Prefere falar direto?{' '}
          <a href={whatsapp(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">Abrir o WhatsApp</a>
        </p>
      </div>

      <aside className="builder-view" aria-label="Prévia do projeto">
        <div className="bv-bar">
          <span>projeto.blueprint</span>
          <b>
            {String(picked.length).padStart(2, '0')}/{String(features.length).padStart(2, '0')} módulos
          </b>
        </div>
        <Blueprint key={kind} features={features} selected={picked} />
        <dl className="bv-brief">
          <div><dt>tipo</dt><dd>{currentKind.need}</dd></div>
          <div>
            <dt>módulos</dt>
            <dd>
              {picked.length
                ? features.filter(feature => picked.includes(feature.id)).map(feature => feature.label).join(' · ')
                : features.length ? 'toque nas opções ao lado' : 'a definir juntos'}
            </dd>
          </div>
        </dl>
      </aside>
    </form>
  )
}
