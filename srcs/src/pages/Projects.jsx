import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import useSound from '../hooks/useSound'
import Footer from '../components/Footer'
import './Projects.css'

const Projects = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)
  const { playNavigate, playSelect } = useSound()
  const backButtonRef = useRef(null)

  useEffect(() => {
    if (isBackButtonSelected && backButtonRef.current) {
      backButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isBackButtonSelected])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        playSelect()
        navigate('/')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedIndex(projects.length - 1)
        } else {
          setSelectedIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : projects.length - 1
            return newIndex
          })
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedIndex(0)
        } else {
          if (selectedIndex === projects.length - 1) {
            setIsBackButtonSelected(true)
          } else {
            setSelectedIndex(prev => prev + 1)
          }
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (!isBackButtonSelected) {
          setIsUsingKeyboard(true)
          playNavigate()
          setSelectedIndex(prev => {
            const newIndex = prev >= 3 ? prev - 3 : prev
            return newIndex
          })
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (!isBackButtonSelected) {
          setIsUsingKeyboard(true)
          playNavigate()
          setSelectedIndex(prev => {
            const newIndex = prev < projects.length - 3 ? prev + 3 : prev
            return newIndex
          })
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSelect()
        if (isBackButtonSelected) {
          navigate('/')
        } else {
          const selectedProject = projects[selectedIndex]
          if (selectedProject.githubUrl) {
            window.open(selectedProject.githubUrl, '_blank')
          }
        }
      }
    }

    const handleMouseMove = () => {
      setIsUsingKeyboard(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [navigate, selectedIndex, isBackButtonSelected, playNavigate, playSelect])

  const projects = [
    {
      title: 'Minishell',
      description: 'A Unix shell implementation in C, recreating bash functionality with pipes, redirections, and built-in commands.',
      tech: 'C • Unix • Bash • System Programming',
      emoji: '🖥️',
      githubUrl: 'https://github.com/myxoceph'
    },
    {
      title: 'MiniRT',
      description: 'A raytracer built from scratch in C, rendering 3D scenes with geometric objects, lights, and shadows.',
      tech: 'C • Graphics • Raytracing • 3D',
      emoji: '🎮',
      githubUrl: 'https://github.com/myxoceph'
    },
    {
      title: 'ft_irc',
      description: 'An IRC (Internet Relay Chat) server written in C++, implementing real-time communication protocols.',
      tech: 'C++ • IRC • Networking • Sockets',
      emoji: '💬',
      githubUrl: 'https://github.com/myxoceph'
    },
    {
      title: 'Push Swap',
      description: 'An algorithm optimization project: sorting data on a stack with a limited set of instructions.',
      tech: 'C • Algorithms • Optimization',
      emoji: '📊',
      githubUrl: 'https://github.com/myxoceph'
    },
    {
      title: 'Philosophers',
      description: 'Solving the dining philosophers problem using threads and mutexes to understand concurrency.',
      tech: 'C • Threads • Concurrency • Mutexes',
      emoji: '🤖',
      githubUrl: 'https://github.com/myxoceph'
    },
    {
      title: 'ft_printf',
      description: 'Recreating the famous printf function from the C standard library with variadic functions.',
      tech: 'C • Variadic • String Manipulation',
      emoji: '📝',
      githubUrl: 'https://github.com/myxoceph'
    }
  ]

  return (
    <div className="page-container projects-page">
      <div className="page-header">
        <h1 className="page-title">PROJECTS</h1>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`project-card ${selectedIndex === index && !isBackButtonSelected ? 'selected' : ''}`}
            onMouseEnter={() => {
              if (!isUsingKeyboard) {
                playNavigate()
                setSelectedIndex(index)
                setIsBackButtonSelected(false)
              }
            }}
            onClick={() => {
              playSelect()
              project.githubUrl && window.open(project.githubUrl, '_blank')
            }}
          >
            <div className="project-emoji">{project.emoji}</div>
            <div className="project-number">#{index + 1}</div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">{project.tech}</div>
          </div>
        ))}
      </div>

      <button 
        ref={backButtonRef}
        className={`back-button ${isBackButtonSelected ? 'selected' : ''}`}
        onClick={() => {
          playSelect()
          navigate('/')
        }}
        onMouseEnter={() => {
          if (!isUsingKeyboard) {
            playNavigate()
            setIsBackButtonSelected(true)
          }
        }}
        onMouseLeave={() => setIsBackButtonSelected(false)}
      >
        <span>← BACK TO MENU</span>
      </button>

      <Footer />
    </div>
  )
}

export default Projects
