import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import MainMenu from './components/MainMenu'
import Projects from './pages/Projects'
import About from './pages/About'
import Resume from './pages/Resume'
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
        
        if (newSequence.length === 8 && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            
            if (!audioRef.current.paused || audioRef.current.currentTime > 0) {
              return []
            }
          }
          
          const audio = new Audio('/sounds/music.mp3')
          audio.volume = 0.5
          audioRef.current = audio
          
          timeoutRef.current = setTimeout(() => {
            audio.play().catch(() => {})
            timeoutRef.current = null
          }, 100)
          
          return []
        }
        
        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
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
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
