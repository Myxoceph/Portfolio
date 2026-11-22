import { useCallback, useRef } from 'react'

const EFFECT_COUNT = 23

const useSound = () => {
  const playSound = useCallback((soundFile) => {
    try {
      const audio = new Audio(soundFile)
      audio.volume = 0.3
      audio.play().catch(() => {})
    } catch (err) {
    }
  }, [])

  const playNavigate = useCallback(() => {
    playSound('/sounds/select.mp3')
  }, [playSound])

  const playSelect = useCallback(() => {
    playSound('/sounds/save.mp3')
  }, [playSound])

  const playBack = useCallback(() => {
    playSound('/sounds/select.mp3')
  }, [playSound])

  const lastEffectRef = useRef(0)

  const playRandomEffect = useCallback(() => {
    let n
    do {
      n = Math.floor(Math.random() * EFFECT_COUNT) + 1
    } while (n === lastEffectRef.current && EFFECT_COUNT > 1)
    lastEffectRef.current = n
    playSound(`/sounds/effects/${n}.mp3`)
  }, [playSound])

  return { playNavigate, playSelect, playBack, playRandomEffect }
}

export default useSound
