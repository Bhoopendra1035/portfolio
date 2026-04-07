import { useState, useEffect, RefObject } from 'react'

export function useCountUp(target: number, ref: RefObject<HTMLElement | null>) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el)
          let start = 0
          const duration = 1800
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            start = Math.min(start + step, target)
            setCount(Math.floor(start))
            if (start >= target) clearInterval(timer)
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, ref])

  return count
}
