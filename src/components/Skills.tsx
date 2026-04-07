import { useEffect, useRef } from 'react'

interface SkillData {
  name: string
  pct: number
  color: string
  icon: string
}

const SKILLS: SkillData[] = [
  { name: 'JavaScript',   pct: 92, color: '#F7DF1E', icon: 'ph-lightning' },
  { name: 'React',        pct: 90, color: '#61DAFB', icon: 'ph-atom' },
  { name: 'Next.js',      pct: 85, color: '#ffffff', icon: 'ph-article' },
  { name: 'Node.js',      pct: 85, color: '#68A063', icon: 'ph-tree-structure' },
  { name: 'MongoDB',      pct: 82, color: '#4DB33D', icon: 'ph-database' },
  { name: 'Tailwind CSS', pct: 90, color: '#06B6D4', icon: 'ph-palette' },
  { name: 'Java',         pct: 85, color: '#007396', icon: 'ph-coffee' },
  { name: 'HTML/CSS',     pct: 95, color: '#E34F26', icon: 'ph-browsers' },
]

function SkillCard({ skill, delay }: { skill: SkillData; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const fill = fillRef.current
    if (!card || !fill) return

    card.style.setProperty('--skill-color', skill.color)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fill.style.width = skill.pct + '%'
          observer.unobserve(fill)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(fill)
    return () => observer.disconnect()
  }, [skill.pct, skill.color])

  return (
    <div
      ref={cardRef}
      className="skill-card"
      data-aos="zoom-in"
      data-aos-delay={String(delay)}
    >
      <div className="skill-icon-wrap">
        <i className={`ph ${skill.icon}`} />
      </div>
      <h3>{skill.name}</h3>
      <div className="skill-bar">
        <div ref={fillRef} className="skill-fill" />
      </div>
      <span className="skill-pct">{skill.pct}%</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">My Skills</span>
          <h2 className="section-title">
            Technologies I<br /><em>Work With</em>
          </h2>
        </div>
        <div className="skills-grid" data-aos="fade-up" data-aos-delay="100">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
