import { useCallback } from 'react'

const useSound = () => {
  const playSound = useCallback((soundFile) => {
    try {
      const audio = new Audio(soundFile)
      audio.volume = 0.3
      audio.play().catch(err => console.log('Sound play failed:', err))
    } catch (err) {
      console.log('Sound error:', err)
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

  return { playNavigate, playSelect, playBack }
}

export default useSound
