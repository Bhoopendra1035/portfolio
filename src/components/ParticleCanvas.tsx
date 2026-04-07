import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  color: string
}

function createParticle(W: number, H: number): Particle {
  const alpha = Math.random() * 0.5 + 0.1
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha,
    color:
      Math.random() > 0.5
        ? `hsla(255, 85%, 75%, ${alpha})`
        : `hsla(195, 100%, 70%, ${alpha})`,
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let particles: Particle[] = Array.from(
      { length: Math.floor((W * H) / 12000) },
      () => createParticle(W, H)
    )
    let rafId: number

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = Array.from(
        { length: Math.floor((W * H) / 12000) },
        () => createParticle(W, H)
      )
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      particles.forEach((p) => {
        const dx = e.clientX - p.x
        const dy = e.clientY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.vx -= (dx / dist) * 0.3
          p.vy -= (dy / dist) * 0.3
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          Object.assign(p, createParticle(W, H))
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      // Connect nearby particles
      const maxDist = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.strokeStyle = `hsla(255, 85%, 75%, ${(1 - dist / maxDist) * 0.15})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} id="particle-canvas" />
}
