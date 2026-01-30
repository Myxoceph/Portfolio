import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import MainMenu from './components/MainMenu'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const [keySequence, setKeySequence] = useState([])
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft']

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence(prev => {
        const newSequence = [...prev, e.key].slice(-8)
        
        // Check if the sequence matches Konami code
        if (newSequence.length === 8 && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          
          // Clear any pending timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          
          // If audio exists and is playing, stop it
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            
            // If it was playing, just stop. Don't start new one.
            if (!audioRef.current.paused || audioRef.current.currentTime > 0) {
              return []
            }
          }
          
          // Create and play new audio
          const audio = new Audio('/sounds/music.mp3')
          audio.volume = 0.5
          audioRef.current = audio
          
          // Small delay to ensure audio is ready
          timeoutRef.current = setTimeout(() => {
            audio.play().catch(err => console.log('Audio play failed:', err))
            timeoutRef.current = null
          }, 100)
          
          // Reset sequence
          return []
        }
        
        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
