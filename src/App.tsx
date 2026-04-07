import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'
import Cursor from './components/Cursor'
import BackToTop from './components/BackToTop'
import { useTheme } from './hooks/useTheme'
import { useScrollSpy } from './hooks/useScrollSpy'

function App() {
  const { isDark, toggleTheme } = useTheme()
  const activeSection = useScrollSpy(['home', 'about', 'skills', 'projects', 'contact'])

  // AOS-lite scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.aosDelay || '0'
            setTimeout(() => el.classList.add('aos-animate'), parseInt(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <ParticleCanvas />
      <Cursor />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
