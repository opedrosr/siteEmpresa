import { memo, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'

/* ------------------------------------------------------------------
   HERO — scroll scrubbing + scrollytelling
   A seção é alta (620svh) e o palco fica "preso" (sticky). O progresso
   da rolagem (0 → 1) vira variáveis CSS (--p, --in-N, --pr-N, --out-N)
   e tudo no hero é desenhado a partir delas: o que você vê é
   literalmente "arrastado" pela rolagem, nos dois sentidos.
   Nenhum re-render do React acontece durante a rolagem.
   ------------------------------------------------------------------ */

const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
const ease = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// medidas do notebook (px) — têm que bater com o CSS
const W = 1120
const H = 700
const D = 700
const BEZEL = 30
const OPEN_ANGLE = 12

// intervalo [início, fim] de cada cena na linha do tempo (0 → 1)
const SCENES: [number, number][] = [
  [0.5, 0.64],
  [0.64, 0.77],
  [0.77, 0.9],
]
const END_START = 0.9

const k = (n: number) => ({ '--k': n }) as CSSProperties

const scenes = [
  {
    tag: 'sites',
    title: 'Sites que',
    em: 'convencem.',
    text: 'Páginas rápidas, pensadas para o celular, que levam o visitante até o seu contato.',
    points: ['Pensado para o celular', 'Contato direto pelo WhatsApp', 'Rápido e fácil de achar'],
  },
  {
    tag: 'sistemas',
    title: 'Sistemas que',
    em: 'organizam.',
    text: 'Agendamentos, cadastros e painéis no lugar de planilhas e controles manuais.',
    points: ['Agendamentos e cadastros', 'Painéis em tempo real', 'Fim das planilhas manuais'],
  },
  {
    tag: 'automacao',
    title: 'Automação que',
    em: 'trabalha por você.',
    text: 'Formulários, planilhas, WhatsApp e e-mail conectados, sem tarefa repetitiva.',
    points: ['Ferramentas conectadas', 'Avisos automáticos', 'Menos trabalho manual'],
  },
]

/* ------------------------------------------------------- campo de sinal */

function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let gap = 32
    let cols = 0
    let rows = 0
    let raf = 0
    let running = false
    let visible = true
    const pointer = { x: 0, y: 0, mix: 0, down: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gap = w < 640 ? 26 : 34
      cols = Math.ceil(w / gap) + 1
      rows = Math.ceil(h / gap) + 1
    }

    const draw = (time: number) => {
      const t = time / 1000
      ctx.clearRect(0, 0, w, h)

      const roamX = w * (0.5 + 0.34 * Math.sin(t * 0.45))
      const roamY = h * (0.42 + 0.24 * Math.cos(t * 0.33))
      if (!pointer.down) pointer.mix = Math.max(0, pointer.mix - 0.006)
      const m = Math.min(pointer.mix, 1)
      const sx = roamX + (pointer.x - roamX) * m
      const sy = roamY + (pointer.y - roamY) * m
      const radius = w < 640 ? 150 : 230

      const hot: { x: number; y: number }[] = []

      for (let j = 0; j < rows; j += 1) {
        for (let i = 0; i < cols; i += 1) {
          const bx = i * gap
          const by = j * gap
          const dx = bx - sx
          const dy = by - sy
          const d = Math.sqrt(dx * dx + dy * dy) || 1
          const kk = Math.max(0, 1 - d / radius)
          const push = kk * kk * 16
          const x = bx + (dx / d) * push
          const y = by + (dy / d) * push
          const ripple = 0.5 + 0.5 * Math.sin(d * 0.04 - t * 2.4)
          const alpha = 0.13 + kk * (0.35 + 0.5 * ripple)
          const size = 1.2 + kk * 2.2

          if (kk > 0.08) {
            ctx.fillStyle = `rgba(255,75,22,${Math.min(alpha + 0.1, 1)})`
          } else {
            ctx.fillStyle = `rgba(255,255,255,${alpha})`
          }
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
          if (kk > 0.5 && hot.length < 70) hot.push({ x, y })
        }
      }

      ctx.lineWidth = 1
      for (let a = 0; a < hot.length; a += 1) {
        for (let b = a + 1; b < hot.length; b += 1) {
          const dx = hot[a].x - hot[b].x
          const dy = hot[a].y - hot[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < gap * 1.6) {
            ctx.strokeStyle = `rgba(255,75,22,${0.34 * (1 - dist / (gap * 1.6))})`
            ctx.beginPath()
            ctx.moveTo(hot[a].x, hot[a].y)
            ctx.lineTo(hot[b].x, hot[b].y)
            ctx.stroke()
          }
        }
      }

      if (m > 0.15) {
        ctx.strokeStyle = `rgba(255,255,255,${0.5 * m})`
        ctx.beginPath()
        ctx.moveTo(sx - 12, sy)
        ctx.lineTo(sx + 12, sy)
        ctx.moveTo(sx, sy - 12)
        ctx.lineTo(sx, sy + 12)
        ctx.stroke()
        ctx.font = "500 10px 'DM Mono', monospace"
        ctx.fillStyle = `rgba(255,255,255,${0.6 * m})`
        ctx.fillText(`x:${String(Math.round(sx)).padStart(4, '0')}  y:${String(Math.round(sy)).padStart(4, '0')}`, sx + 16, sy - 12)
      }
    }

    const loop = (time: number) => {
      if (!running) return
      draw(time)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const setPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.mix = 1
      pointer.down = true
    }
    const release = () => {
      pointer.down = false
    }

    resize()
    if (reduce) draw(0)
    start()

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    observer.observe(host)

    const onVisibility = () => (document.hidden ? stop() : start())
    const onResize = () => {
      resize()
      if (reduce) draw(0)
    }

    host.addEventListener('pointermove', setPointer, { passive: true })
    host.addEventListener('pointerdown', setPointer, { passive: true })
    host.addEventListener('pointerup', release)
    host.addEventListener('pointerleave', release)
    host.addEventListener('pointercancel', release)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      host.removeEventListener('pointermove', setPointer)
      host.removeEventListener('pointerdown', setPointer)
      host.removeEventListener('pointerup', release)
      host.removeEventListener('pointerleave', release)
      host.removeEventListener('pointercancel', release)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="signal" aria-hidden="true" />
}

/* -------------------------------------------------------------- visuais */

function SiteVisual() {
  return (
    <div className="hv hv-site" aria-hidden="true">
      <div className="hv-top"><i /><i /><i /><b /></div>
      <div className="hv-page">
        <span className="hv-b hv-h" style={k(0)} />
        <span className="hv-b hv-h hv-short" style={k(1)} />
        <span className="hv-b hv-p" style={k(2)} />
        <span className="hv-b hv-btn" style={k(3)}>Falar agora</span>
        <div className="hv-row">
          <span className="hv-b" style={k(4)} />
          <span className="hv-b" style={k(5)} />
          <span className="hv-b" style={k(6)} />
        </div>
      </div>
    </div>
  )
}

function SystemVisual() {
  return (
    <div className="hv hv-sys" aria-hidden="true">
      <div className="hv-head"><span>OUT</span><b>14:30</b></div>
      <div className="hv-cal">
        {Array.from({ length: 21 }).map((_, index) => (
          <span
            key={index}
            style={k(index)}
            className={index === 10 ? 'is-pick' : [2, 5, 8, 13, 17].includes(index) ? 'is-busy' : ''}
          />
        ))}
      </div>
      <div className="hv-bars">
        {[46, 72, 38, 88, 60, 94].map((height, index) => (
          <i key={index} style={{ '--h': `${height}%`, '--k': index } as CSSProperties} />
        ))}
      </div>
      <div className="hv-toast"><Check size={13} /> Agendado</div>
    </div>
  )
}

const NODES = [
  { x: 50, y: 35, label: 'APORTE', k: 0, core: true },
  { x: 14, y: 12, label: 'FORM', k: 1, core: false },
  { x: 14, y: 58, label: 'PLANILHA', k: 2, core: false },
  { x: 86, y: 12, label: 'ZAP', k: 3, core: false },
  { x: 86, y: 58, label: 'E-MAIL', k: 4, core: false },
]

function AutoVisual() {
  const core = NODES[0]
  return (
    <div className="hv hv-auto" aria-hidden="true">
      <svg viewBox="0 0 100 70">
        {NODES.slice(1).map(node => {
          const incoming = node.k <= 2
          return (
            <line
              key={node.label}
              pathLength={1}
              style={k(node.k)}
              x1={incoming ? node.x : core.x}
              y1={incoming ? node.y : core.y}
              x2={incoming ? core.x : node.x}
              y2={incoming ? core.y : node.y}
            />
          )
        })}
        {NODES.map(node => (
          <g key={node.label} className={`nd${node.core ? ' is-core' : ''}`} style={k(node.k)}>
            <rect x={node.x - 12} y={node.y - 4.5} width={24} height={9} rx={2.2} />
            <text x={node.x} y={node.y + 0.2}>{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const visuals = [<SiteVisual key="s" />, <SystemVisual key="y" />, <AutoVisual key="a" />]

/* ------------------------------------------------------------ notebook */

const KEY_ROWS: number[][] = [
  Array(14).fill(1),
  [...Array(13).fill(1), 1.7],
  [1.5, ...Array(12).fill(1), 1.2],
  [1.8, ...Array(11).fill(1), 2.1],
  [2.3, ...Array(10).fill(1), 2.7],
  [1.2, 1.2, 1.2, 1.2, 5.6, 1.2, 1.2, 1.2],
]

function Laptop({ logoSrc }: { logoSrc: string }) {
  return (
    <div className="lp-rig">
      <div className="lp-shadow" />

      <div className="lp-face lp-bottom" />
      <div className="lp-face lp-front" />
      <div className="lp-face lp-back" />
      <div className="lp-face lp-sl" />
      <div className="lp-face lp-sr" />
      <div className="lp-face lp-top">
        <div className="kb">
          {KEY_ROWS.map((row, index) => (
            <div key={index} className={`kb-row${index === 0 ? ' fn' : ''}`}>
              {row.map((width, i) => <i key={i} style={{ flex: width }} />)}
            </div>
          ))}
          <div className="kb-sweep" />
        </div>
        <div className="tp" />
      </div>

      <div className="lp-lid">
        <div className="lid-edge lid-l" />
        <div className="lid-edge lid-r" />
        <div className="lid-edge lid-t" />

        <div className="lid-outer">
          <img src={logoSrc} alt="" />
        </div>

        <div className="lid-screen">
          <span className="cam" />
          <div className="display">
            <div className="scr-halo" />
            <img className="scr-logo" src={logoSrc} alt="" />
          </div>
          <div className="lp-glare" />
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- hero */

type HeroProps = { logoSrc?: string; whatsappHref?: string }

function Hero({
  logoSrc = '/aporte-symbol.png',
  whatsappHref = 'https://wa.me/5531983994883',
}: HeroProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    const stage = section?.querySelector<HTMLElement>('.hs-stage')
    const rig = section?.querySelector<HTMLElement>('.lp-rig')
    if (!section || !stage || !rig) return undefined
    let frame = 0
    const pointer = { x: 0, y: 0 }

    const set = (name: string, value: number) => section.style.setProperty(name, value.toFixed(4))

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vw = stage.clientWidth
      const vh = stage.clientHeight
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      const wide = vw >= 900 && vw / vh >= 1.15

      /* --- notebook: abre, aproxima até a tela e atravessa --- */
      const open = ease(seg(p, 0.07, 0.26))
      const dive = ease(seg(p, 0.18, 0.42))
      const yaw0 = lerp(-34, 0, ease(seg(p, 0.05, 0.36)))
      const pitch0 = lerp(40, 24, ease(seg(p, 0.05, 0.18)))
      const damp = 1 - 0.6 * dive
      const yaw = yaw0 + pointer.x * 5 * damp
      const pitch = lerp(pitch0, -OPEN_ANGLE, dive) - pointer.y * 4 * damp

      const dw = W - BEZEL * 2
      const dh = H - BEZEL * 2
      const sStart = (wide ? vw * 0.5 : vw * 0.88) / 1320
      const sFinal = wide ? Math.max(vw / dw, vh / dh) : (vw * 0.98) / dw
      const portal = 1 + 3.5 * ease(seg(p, 0.42, 0.54))
      const scale = sStart * Math.pow(sFinal / sStart, dive) * portal

      const a = (OPEN_ANGLE * Math.PI) / 180
      const innerY = dive * ((H / 2) * Math.cos(a) + 8)
      const innerZ = dive * (D / 2 + (H / 2) * Math.sin(a))

      rig.style.transform =
        `scale3d(${scale.toFixed(4)},${scale.toFixed(4)},${scale.toFixed(4)}) ` +
        `rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) translate3d(0,${innerY.toFixed(1)}px,${innerZ.toFixed(1)}px)`

      set('--lap', seg(p, 0.05, 0.11))
      set('--open', open)
      set('--dive', dive)
      set('--sweep', seg(p, 0.06, 0.26) * 1.3 - 0.15)
      set('--glow', seg(p, 0.34, 0.5))
      set('--lap-out', seg(p, 0.46, 0.54))

      /* --- textos e cenas --- */
      set('--p', p)
      set('--out-0', seg(p, 0.05, 0.13))
      SCENES.forEach(([s0, e0], i) => {
        set(`--in-${i + 1}`, seg(p, s0, s0 + 0.05))
        set(`--pr-${i + 1}`, seg(p, s0 + 0.02, e0 - 0.05))
        set(`--out-${i + 1}`, seg(p, e0 - 0.04, e0))
      })
      set('--in-4', seg(p, END_START, END_START + 0.08))

      let index = 0
      if (p >= END_START) index = 4
      else if (p >= SCENES[2][0]) index = 3
      else if (p >= SCENES[1][0]) index = 2
      else if (p >= SCENES[0][0]) index = 1
      section.dataset.scene = String(index)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = stage.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      onScroll()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    stage.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      stage.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <section id="inicio" className="hs" ref={ref} data-scene="0">
      <div className="hs-stage">
        <SignalField />
        <div className="hs-mark" aria-hidden="true">
          <img src={logoSrc} alt="" />
        </div>
        <div className="hs-shade" aria-hidden="true" />
        <div className="lp-world" aria-hidden="true">
          <Laptop logoSrc={logoSrc} />
        </div>

        {/* abertura */}
        <div className="hs-intro">
          <div className="hs-wrap">
            <p className="hs-eyebrow">
              <span className="status-dot" aria-hidden="true" /> Software house · Brasil
            </p>
            <h1 className="hs-title">
              <span className="hs-line l1"><span>Ideias que</span></span>
              <span className="hs-line l2"><span>viram</span></span>
              <span className="hs-line l3"><em>sistemas.</em></span>
            </h1>
            <p className="hs-lede">
              Criamos sites, sistemas e automações para empresas que querem evoluir sua presença e sua operação.
            </p>
            <p className="hs-hint">
              role para explorar <ArrowRight size={14} aria-hidden="true" style={{ transform: 'rotate(90deg)' }} />
            </p>
          </div>
        </div>

        {/* cenas */}
        {scenes.map((scene, index) => (
          <div key={scene.tag} className={`hs-scene sc-${index + 1}`}>
            <div className="hs-wrap">
              <div className="hs-copy">
                <span className="kicker">{`${String(index + 1).padStart(2, '0')} / 03 · ${scene.tag}`}</span>
                <h2 className="hs-h2">
                  {scene.title} <em>{scene.em}</em>
                </h2>
                <p className="hs-p">{scene.text}</p>
                <ul className="hs-points">
                  {scene.points.map((point, i) => (
                    <li key={point} style={k(i)}>
                      <Check size={16} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hs-visual">{visuals[index]}</div>
            </div>
          </div>
        ))}

        {/* final */}
        <div className="hs-end">
          <div className="hs-end-glow" aria-hidden="true" />
          <div className="hs-end-inner">
            <span className="kicker">pronto?</span>
            <h2 className="hs-end-title">
              Vamos construir <em>o seu?</em>
            </h2>
            <p className="hs-p">Conte sua ideia e a gente desenha o caminho.</p>
            <div className="hs-end-actions">
              <a className="btn btn-primary btn-lg" data-magnetic href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
              </a>
              <a className="btn btn-ghost btn-lg" href="#portfolio">
                Ver projetos <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* progresso */}
        <div className="hs-hud" aria-hidden="true">
          <div className="hs-bar"><span /></div>
          <ol className="hs-steps">
            <li>Sites</li>
            <li>Sistemas</li>
            <li>Automação</li>
            <li>Contato</li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)