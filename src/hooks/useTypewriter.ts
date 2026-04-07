import { useState, useEffect } from 'react'

export function useTypewriter(words: string[], speed = 80, deleteSpeed = 60, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting) {
      timer = setTimeout(() => {
        setText((t) => current.slice(0, t.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      }, speed)
    } else {
      timer = setTimeout(() => {
        setText((t) => t.slice(0, -1))
        if (text.length === 0) {
          setDeleting(false)
          setWordIdx((i) => (i + 1) % words.length)
        }
      }, deleteSpeed)
    }

    return () => clearTimeout(timer)
  }, [text, deleting, wordIdx, words, speed, deleteSpeed, pause])

  return text
}
