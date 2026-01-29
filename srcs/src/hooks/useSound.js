import { useCallback } from 'react'

const useSound = () => {
  const createBeep = useCallback((frequency, duration = 0.05) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch (err) {
      console.log('Sound error:', err)
    }
  }, [])

  const playNavigate = useCallback(() => {
    createBeep(800, 0.05)
  }, [createBeep])

  const playSelect = useCallback(() => {
    createBeep(1200, 0.1)
  }, [createBeep])

  const playBack = useCallback(() => {
    createBeep(600, 0.08)
  }, [createBeep])

  return { playNavigate, playSelect, playBack }
}

export default useSound
