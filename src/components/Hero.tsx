import { useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCountUp } from '../hooks/useCountUp'

const ROLES = [
  'Full-Stack Developer',
  'Node.js Specialist',
  'React.js Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
]

const STATS = [
  { count: 150, label: 'GFG Problems' },
  { count: 3,   label: 'Major Projects' },
  { count: 12,  label: 'Happy Clients' },
]

function StatItem({ count, label }: { count: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const val = useCountUp(count, ref)
  return (
    <div className="stat">
      <span ref={ref} className="stat-num">{val}</span><span>+</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge" data-aos="fade-down">
          <span className="badge-dot" />
          Available for Work
        </div>

        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
          <span className="greeting">Hello, I'm</span>
          <span className="name-text">Bhupendra Tale</span>
          <span className="role-wrapper">
            <span className="role-text">{role}</span>
            <span className="cursor-blink">|</span>
          </span>
        </h1>

        <p className="hero-desc" data-aos="fade-up" data-aos-delay="200">
          I craft immersive digital experiences that blend stunning visuals with clean,
          performant code. Let's build something extraordinary together.
        </p>

        <div className="hero-cta" data-aos="fade-up" data-aos-delay="300">
          <a href="#projects" className="btn btn-primary" id="view-work-btn">
            <span>View My Work</span>
            <i className="ph ph-arrow-right" />
          </a>
          <a href="#contact" className="btn btn-outline" id="contact-btn">
            <span>Get In Touch</span>
          </a>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
          {STATS.map((s, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className="stat-divider" />}
              <StatItem key={s.label} count={s.count} label={s.label} />
            </>
          ))}
        </div>
      </div>

      <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
        <div className="avatar-wrapper">
          <div className="avatar-ring ring-1" />
          <div className="avatar-ring ring-2" />
          <div className="avatar-ring ring-3" />
          <div className="avatar-circle">
            <img src="/" alt="Bhupendra Tale" className="avatar-img" />
          </div>
          <div className="floating-badge badge-react">
            <i className="ph ph-atom" /> React
          </div>
          <div className="floating-badge badge-node">
            <i className="ph ph-tree-structure" /> Node.js
          </div>
          <div className="floating-badge badge-design">
            <i className="ph ph-paint-brush" /> UI/UX
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}
