import { useRef } from 'react'
import type { MouseEvent } from 'react'


interface Project {
  id: number
  title: string
  desc: string
  tags: string[]
  gradient: string
  icon: string
  image: string
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'DG News Platform',
    desc: 'A sophisticated news portal and media platform with real-time updates across multiple departments. Built for performance and modern readability.',
    tags: ['React.js', 'Next.js', 'Vercel', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #1e293b, #6366f1)',
    icon: 'ph-newspaper',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://dg-news-gamma.vercel.app/',
    githubUrl: 'https://github.com/bhupendratale',
    featured: true,
  },
  {
    id: 2,
    title: 'Tiffin Center Service',
    desc: 'A professional food delivery and management platform for tiffin services, featuring an intuitive menu and seamless order processing system.',
    tags: ['JavaScript', 'API Integration', 'UI/UX Design'],
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    icon: 'ph-cooking-pot',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://tiffin-center-nu.vercel.app/',
    githubUrl: 'https://github.com/bhupendratale',
  },
  {
    id: 3,
    title: 'IPL Cricket Live Platform',
    desc: 'An immersive real-time cricket streaming and live scoring platform with dynamic player statistics and interactive sports engagement features.',
    tags: ['React.js', 'Socket.io', 'HLS Streaming', 'Vercel'],
    gradient: 'linear-gradient(135deg, #2563eb, #fbbf24)',
    icon: 'ph-trophy',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://ipl-cricket-c6ko.vercel.app/',
    githubUrl: 'https://github.com/bhupendratale',
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={`project-card${project.featured ? ' featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={String(delay)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`project-img proj-bg-${project.id}`}>
        <img src={project.image} alt={project.title} className="project-thumbnail" />
        <div className="project-overlay">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link" aria-label="Live demo">
            <i className="ph ph-arrow-square-out" />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link" aria-label="GitHub">
            <i className="ph ph-github-logo" />
          </a>
        </div>
      </div>
      <div className="project-info">
        <div className="project-tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Featured<br /><em>Projects</em></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
