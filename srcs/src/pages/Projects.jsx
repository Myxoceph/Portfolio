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
  const { playNavigate, playSelect, playRandomEffect } = useSound()
  const backButtonRef = useRef(null)
  const projectRefs = useRef([])
  const [noticeIndex, setNoticeIndex] = useState(null)
  const noticeTimerRef = useRef(null)

  useEffect(() => () => clearTimeout(noticeTimerRef.current), [])

  const activateProject = (project, index) => {
    if (project.githubUrl) {
      playSelect()
      window.open(project.githubUrl, '_blank')
      return
    }
    playRandomEffect()
    setNoticeIndex(index)
    clearTimeout(noticeTimerRef.current)
    noticeTimerRef.current = setTimeout(() => setNoticeIndex(null), 3500)
  }

  useEffect(() => {
    if (isBackButtonSelected && backButtonRef.current) {
      backButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else if (!isBackButtonSelected && projectRefs.current[selectedIndex]) {
      projectRefs.current[selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isBackButtonSelected, selectedIndex])

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
        if (isBackButtonSelected) {
          playSelect()
          navigate('/')
        } else {
          activateProject(projects[selectedIndex], selectedIndex)
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
  }, [navigate, selectedIndex, isBackButtonSelected, playNavigate, playSelect, playRandomEffect])

  const projects = [
    {
      title: 'ŠKODA AI Skill Coach',
      description: '🏆 42 Prague × ŠKODA Auto Hackathon Winner - AI talent intelligence platform that turns reactive HR into predictive skill management: team capability analysis, skill risk radar, promotion readiness, career paths, and a 5-year skill forecast. (Private project)',
      tech: 'React • TypeScript • FastAPI • PostgreSQL • Azure OpenAI • Docker',
      emoji: '🚗',
      githubUrl: null
    },
    {
      title: 'PeerFlow',
      description: '🏆 42 Kocaeli × SUI Hackathon Winner - Decentralized collaboration platform with on-chain messaging, freelance jobs, and project management built on Sui blockchain.',
      tech: 'React • Sui Blockchain • Move • zkLogin • Walrus',
      emoji: '🌊',
      githubUrl: 'https://github.com/Myxoceph/SUI-Hackathon'
    },
    {
      title: 'Vakıfname',
      description: '🏆 42 Türkiye × Vakıf Katılım KÖK&KOD Hackathon Winner - Mobile & web app for exploring 770 foundation heritage sites with AR inscription reading, camera-verified visits, an AI guide, and real public-transit routing.',
      tech: 'TypeScript • Expo • Fastify • Prisma • PostgreSQL • MindAR',
      emoji: '🕌',
      githubUrl: 'https://github.com/Myxoceph/RootNCode-Hackathon'
    },
    {
      title: 'ft_transcendence',
      description: 'A full-stack real-time multiplayer Pong game with chat system, user authentication, game history, and friend management. Built as the final project at 42 School.',
      tech: 'TypeScript • Node.js • Fastify • WebSocket • SQLite',
      emoji: '🏓',
      githubUrl: 'https://github.com/Myxoceph/ft_transcendence'
    },
    {
      title: 'Minishell',
      description: 'A Unix shell implementation in C, recreating bash functionality with pipes, redirections, and built-in commands.',
      tech: 'C • Unix • Bash • System Programming',
      emoji: '🖥️',
      githubUrl: 'https://github.com/Myxoceph/minishell'
    },
    {
      title: 'MiniRT',
      description: 'A raytracer built from scratch in C, rendering 3D scenes with geometric objects, lights, and shadows.',
      tech: 'C • Graphics • Raytracing • 3D',
      emoji: '🎮',
      githubUrl: 'https://github.com/Myxoceph/42miniRT'
    },
    {
      title: 'ft_irc',
      description: 'An IRC (Internet Relay Chat) server written in C++, implementing real-time communication protocols.',
      tech: 'C++ • IRC • Networking • Sockets',
      emoji: '💬',
      githubUrl: 'https://github.com/Myxoceph/ft_irc'
    },
    {
      title: 'Push Swap',
      description: 'An algorithm optimization project: sorting data on a stack with a limited set of instructions.',
      tech: 'C • Algorithms • Optimization',
      emoji: '📊',
      githubUrl: 'https://github.com/Myxoceph/push_swap'
    },
    {
      title: 'Philosophers',
      description: 'Solving the dining philosophers problem using threads and mutexes to understand concurrency.',
      tech: 'C • Threads • Concurrency • Mutexes',
      emoji: '🤖',
      githubUrl: 'https://github.com/Myxoceph/Philosophers'
    },
    {
      title: 'Avaj Launcher',
      description: 'An aircraft weather simulation in Java, built around the Observer, Singleton, and Factory design patterns with scenario file parsing.',
      tech: 'Java • OOP • Design Patterns',
      emoji: '✈️',
      githubUrl: 'https://github.com/Myxoceph/Avaj-Launcher'
    },
    {
      title: 'Libasm',
      description: 'Reimplementing libc functions (strlen, strcpy, strcmp, strdup, read, write) in x86-64 assembly with proper errno handling.',
      tech: 'Assembly • NASM • x86-64 • C',
      emoji: '⚙️',
      githubUrl: 'https://github.com/Myxoceph/Libasm'
    },
    {
      title: 'Much More Projects',
      description: 'Explore all my repositories on GitHub for more projects including C, C++, and various other programming challenges.',
      tech: 'Visit My GitHub Page',
      emoji: '➡️',
      githubUrl: 'https://github.com/Myxoceph'
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
            ref={el => projectRefs.current[index] = el}
            className={`project-card ${selectedIndex === index && !isBackButtonSelected ? 'selected' : ''}`}
            onMouseEnter={() => {
              if (!isUsingKeyboard) {
                playNavigate()
                setSelectedIndex(index)
                setIsBackButtonSelected(false)
              }
            }}
            onClick={() => activateProject(project, index)}
          >
            {noticeIndex === index && (
              <div className="proprietary-popup" role="status">
                <div className="proprietary-popup-title">🔒 PROPRIETARY CODE</div>
                <p>Built for ŠKODA Auto under a private hackathon agreement. The source code is confidential and can't be shared publicly.</p>
              </div>
            )}
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
