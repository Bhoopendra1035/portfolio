import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)

    let rafId: number
    const animateTrail = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12
      trail.current.y += (pos.current.y - trail.current.y) * 0.12
      if (trailRef.current) {
        trailRef.current.style.left = trail.current.x + 'px'
        trailRef.current.style.top = trail.current.y + 'px'
      }
      rafId = requestAnimationFrame(animateTrail)
    }
    animateTrail()

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const els = document.querySelectorAll('a, button, .skill-card, .project-card, .social-link')
    els.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={`cursor${hovering ? ' hovering' : ''}`} />
      <div ref={trailRef} className={`cursor-trail${hovering ? ' hovering' : ''}`} />
    </>
  )
}
