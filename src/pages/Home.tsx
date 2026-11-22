import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import Hero from '../components/Hero'
import PostCard from '../components/PostCard'
import ProjectsShowcase from '../components/ProjectsShowcase'
import ResultsPanel from '../components/ResultsPanel'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import ScrollStory from '../components/ScrollStory'
import ServiceCarousel from '../components/ServiceCarousel'
import StepsRow from '../components/StepsRow'
import { generalFaq, principles } from '../data/content'
import { posts } from '../data/posts'
import { GENERIC_MESSAGE, SITE, whatsapp } from '../data/site'

export default function Home() {
  return (
    <>
      <Hero logoSrc={SITE.logo} whatsappHref={whatsapp(GENERIC_MESSAGE)} />

      <ScrollStory />

      <section id="servicos" className="section theme-light">
        <div className="wrap">
          <SectionHead
            kicker="serviços"
            title="O que"
            accent="construímos."
            lede="Soluções pensadas de acordo com o estágio, o objetivo e a necessidade de cada empresa."
          />
        </div>
        <ServiceCarousel />
        <div className="wrap section-actions">
          <Link className="btn btn-solid" to="/servicos">
            Ver todos os serviços <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="projetos" className="section">
        <div className="wrap">
          <SectionHead
            kicker="projetos"
            title="Projetos"
            accent="reais."
            lede="Uma seleção do que já foi construído pela Aporte."
          />
          <Reveal>
            <ProjectsShowcase />
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-line" to="/projetos">
              Ver todos os projetos <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <Reveal>
            <ResultsPanel />
          </Reveal>
        </div>
      </section>

      <section className="section theme-light">
        <div className="wrap">
          <SectionHead
            kicker="como trabalhamos"
            title="Do problema à"
            accent="solução."
            lede="Um processo claro para transformar necessidades reais em soluções digitais que façam sentido para o negócio."
          />
          <Reveal>
            <StepsRow />
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-solid" to="/processo">
              Conhecer o processo <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="por que a aporte"
            title="Tecnologia com"
            accent="direção."
            lede="A Aporte cria soluções digitais para empresas que precisam ir além de apenas estar presentes na internet."
          />
          <Reveal>
            <ul className="principles">
              {principles.map((item, index) => (
                <li key={item.title}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-line" to="/sobre">
              Conhecer a Aporte <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section theme-light">
        <div className="wrap">
          <SectionHead
            kicker="blog"
            title="Conteúdo para"
            accent="decidir melhor."
            lede="Artigos práticos sobre sites, sistemas e automação."
          />
          <Reveal className="post-grid">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
          <div className="section-actions">
            <Link className="btn btn-solid" to="/blog">
              Ver todos os artigos <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker="perguntas frequentes" title="Dúvidas" accent="comuns." />
          <Reveal>
            <FaqList items={generalFaq} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}