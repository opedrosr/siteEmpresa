import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'

// Cada página vira um arquivo separado: o visitante baixa só o que usa.
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Process = lazy(() => import('./pages/Process'))
const Technology = lazy(() => import('./pages/Technology'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Quote = lazy(() => import('./pages/Quote'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicos" element={<Services />} />
        <Route path="servicos/:slug" element={<ServiceDetail />} />
        <Route path="projetos" element={<Projects />} />
        <Route path="projetos/:slug" element={<ProjectDetail />} />
        <Route path="sobre" element={<About />} />
        <Route path="processo" element={<Process />} />
        <Route path="tecnologia" element={<Technology />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="orcamento" element={<Quote />} />
        <Route path="contato" element={<Contact />} />
        <Route path="privacidade" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
