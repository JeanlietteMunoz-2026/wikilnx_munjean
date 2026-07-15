import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'

import inicioDoc from '../docs_munjean/01_inicio_munjean.md?raw'
import licenciasDoc from '../docs_munjean/02_licencias_munjean.md?raw'
import instalacionDoc from '../docs_munjean/03_instalacion_munjean.md?raw'
import permisosDoc from '../docs_munjean/04_permisos_munjean.md?raw'
import paquetesDoc from '../docs_munjean/05_paquetes_munjean.md?raw'
import nginxDoc from '../docs_munjean/06_nginx_munjean.md?raw'
import promptsDoc from '../docs_munjean/07_prompts_munjean.md?raw'

const imageAssets = import.meta.glob('../docs_munjean/img_munjean/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
})

const imageLookup = Object.entries(imageAssets).reduce((acc, [fullPath, url]) => {
  const normalizedPath = fullPath.replace('../docs_munjean/', '')
  acc[normalizedPath] = url
  acc[normalizedPath.replace(/^img_munjean\//, 'docs_munjean/img_munjean/')] = url
  acc[normalizedPath.replace(/^img_munjean\//, '')] = url
  acc[fullPath] = url
  acc[fullPath.replace('../docs_munjean/', 'img_munjean/')] = url
  return acc
}, {})

const sections = [
  {
    id: '01_inicio',
    title: '01. Inicio',
    shortTitle: 'Inicio',
    content: inicioDoc,
    description: 'Objetivo del laboratorio y topología del entorno.',
  },
  {
    id: '02_licencias',
    title: '02. Licencias',
    shortTitle: 'Licencias',
    content: licenciasDoc,
    description: 'Modelos de licenciamiento y auditoría del software.',
  },
  {
    id: '03_instalacion',
    title: '03. Instalación',
    shortTitle: 'Instalación',
    content: instalacionDoc,
    description: 'Configuración de red, hostname, actualizaciones y firewall.',
  },
  {
    id: '04_permisos',
    title: '04. Permisos',
    shortTitle: 'Permisos',
    content: permisosDoc,
    description: 'Control de accesos, chmod, chown y permisos especiales.',
  },
  {
    id: '05_paquetes',
    title: '05. Paquetes',
    shortTitle: 'Paquetes',
    content: paquetesDoc,
    description: 'Gestión de paquetes con APT y verificación de herramientas.',
  },
  {
    id: '06_nginx',
    title: '06. Nginx',
    shortTitle: 'Nginx',
    content: nginxDoc,
    description: 'Despliegue del sitio web y configuración del servidor.',
  },
  {
    id: '07_prompts',
    title: '07. Prompts',
    shortTitle: 'Prompts',
    content: promptsDoc,
    description: 'Bitácora de decisiones y uso de inteligencia artificial.',
  },
]

const components = {
  img: ({ alt, src, ...props }) => {
    const resolvedSrc = imageLookup[src] || imageLookup[src?.replace(/^\.\//, '')]

    if (!resolvedSrc) {
      return <span className="image-placeholder">[Imagen: {alt || 'captura'}]</span>
    }

    return <img src={resolvedSrc} alt={alt || ''} className="markdown-image" {...props} />
  },
}

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const currentSection = sections.find((section) => section.id === activeSection) ?? sections[0]

  return (
    <main className="app-shell">
      <section className="wiki-card">
        <aside className="wiki-sidebar">
          <div className="sidebar-header">
            <span className="badge">Wiki Skynet</span>
            <h2>Laboratorio Linux</h2>
            <p>Guía completa desde inicio hasta prompts.</p>
          </div>

          <nav className="doc-list" aria-label="Secciones de la wiki">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`doc-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="doc-number">{section.title}</span>
                <span className="doc-description">{section.description}</span>
              </button>
            ))}
          </nav>
        </aside>

        <article className="wiki-content">
          <div className="content-header">
            <span className="badge">{currentSection.shortTitle}</span>
            <h1>Wiki de Linux Server</h1>
            <p>{currentSection.description}</p>
            <p className="section-path">Sección activa: {currentSection.title}</p>
          </div>

          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {currentSection.content}
            </ReactMarkdown>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
