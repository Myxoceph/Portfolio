import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useSound from '../hooks/useSound'
import Footer from '../components/Footer'
import './About.css'

const About = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('WHO I AM')
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)
  const { playNavigate, playSelect } = useSound()
  const backButtonRef = useRef(null)

  const categoryOrder = ['WHO I AM', 'MY STORY', '42', 'SKILLS']

  useEffect(() => {
    if (isBackButtonSelected && backButtonRef.current) {
      backButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isBackButtonSelected])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = categoryOrder.indexOf(selectedCategory)
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedCategory(categoryOrder[categoryOrder.length - 1])
        } else {
          const newIndex = currentIndex > 0 ? currentIndex - 1 : categoryOrder.length - 1
          setSelectedCategory(categoryOrder[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedCategory(categoryOrder[0])
        } else {
          if (currentIndex === categoryOrder.length - 1) {
            setIsBackButtonSelected(true)
          } else {
            const newIndex = currentIndex + 1
            setSelectedCategory(categoryOrder[newIndex])
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSelect()
        if (isBackButtonSelected) {
          navigate('/')
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        playSelect()
        navigate('/')
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
  }, [selectedCategory, isBackButtonSelected, navigate, playNavigate, playSelect])

  const categories = {
    'WHO I AM': {
      content: [
        'NAME: Ahmet BAKIRCAN',
        'ROLE: 42 Kocaeli Student',
        'LEVEL: Level 8 %51',
        'PROJECTS COMPLETED: 25',
        '',
        'I am a passionate developer currently studying at 42 Kocaeli, where I am learning to tackle complex programming challenges through peer-to-peer learning.',
        '',
        'I love building innovative solutions and continuously expanding my skills in software development.',
      ]
    },
    'MY STORY': {
      content: [
        '-- THE BEGINNING --',
        '',
        'I\'ve been interested in computers for as long as I can remember. My first computer was cheap, slow, and constantly breaking—which turned out to be a gift. Every problem forced me to figure things out on my own. Since most useful answers were in English, I unintentionally trained both my problem-solving skills and my English at the same time.',
        '',
        '-- FINDING MY DIRECTION --',
        '',
        'During high school, my mathematics background was far from strong. Instead of pretending otherwise, I made a pragmatic decision and focused on what I already did well: English. That choice paid off. I ranked highly in the language track of the university entrance exam and earned a place in an English Language Teaching (ELT) program.',
        '',
        '-- QUESTIONING THE PATH --',
        '',
        'As graduation approached, a persistent question surfaced: Did I actually want to do this for the rest of my life?',
        'I completed my degree, but the doubt didn\'t go away. I knew I needed a different direction—one that aligned better with how my mind worked.',
        '',
        '-- DISCOVERING 42 --',
        '',
        'That\'s when I discovered 42 Schools.',
        'Hearing about it triggered a familiar, almost childlike excitement—the same curiosity I felt years ago sitting in front of a broken computer. I decided to take the risk and applied to 42 Kocaeli, entering with virtually no formal background in software development.',
        '',
        'Through peer-to-peer learning, relentless problem-solving, and an intense piscine process, I earned my place in the core program. It felt less like continuing life and more like rebooting it.',
        '',
        '-- BUILDING THE FOUNDATION --',
        '',
        'Over nearly two years at 42, I built a solid foundation primarily in C and C++, alongside system programming, Unix/Linux environments, virtual machines, networking, and Docker.',
        'More importantly, I learned how to learn: how to read documentation effectively, debug under pressure, and reason about systems instead of guessing.',
        '',
        '-- STEPPING INTO THE REAL WORLD --',
        '',
        'To prove this growth wasn\'t just academic, I stepped into real competition. I joined my first two hackathons—and won both.',
        '',
        'The first was the 42 Prague × Škoda AI Skill Coach Hackathon in Prague, Czech Republic. Shortly after returning home, I heard about another event at my campus. Just two days after arriving back in Gebze, I participated in the 42 Kocaeli × SUI Hackathon—and won that as well.',
        '',
        '-- WHERE I STAND TODAY --',
        '',
        'Today, I continue my path as a software developer adapting to a rapidly changing industry. I don\'t claim to know everything. What I do have is a strong low-level foundation, a systems-oriented mindset, and the discipline to keep learning—without shortcuts, without illusions, and without fear of starting from zero when necessary.',
      ]
    },
    '42': {
      content: [
        { type: 'image', src: '/42kocaeli.webp', alt: '42 Kocaeli' },
        '',
        'The name 42 comes from "The Hitchhiker\'s Guide to the Galaxy" by Douglas Adams, where 42 is humorously presented as the "Answer to the Ultimate Question of Life, the Universe, and Everything." Founded by French entrepreneur Xavier Niel in 2013, 42 schools have 54 campuses in 31 countries with over 21,000+ students worldwide. 42 is not just a place to learn coding; it\'s a community where innovation thrives, collaboration is key, and students are empowered to take charge of their own learning journey. 42 teaches students to write clean, efficient code that adheres to norminette standards, fostering a strong foundation in programming best practices. It also provides students with real-world projects that challenge their skills and encourage creativity. You can learn more about 42 on the official website:',
        { type: 'link', url: 'https://42.fr/', text: 'Here' },
      ]
    },
	'SKILLS': {
	content: [
		{ type: 'skill', name: 'C PROGRAMMING', value: 95 },
		{ type: 'skill', name: 'C++ PROGRAMMING', value: 90 },
		{ type: 'skill', name: 'PYTHON PROGRAMMING', value: 40 },
		{ type: 'skill', name: 'NODE.JS', value: 75 },
		{ type: 'skill', name: 'FASTIFY', value: 60 },
		{ type: 'skill', name: 'MOVE', value: 80 },
		{ type: 'skill', name: 'HTML', value: 70 },
		{ type: 'skill', name: 'CSS & RESPONSIVE DESIGN', value: 60 },
		{ type: 'skill', name: 'VIRTUAL MACHINES', value: 75 },

		{ type: 'skill', name: 'UNIX / LINUX COMMANDS & SHELL', value: 88 },
		{ type: 'skill', name: 'GIT & VERSION CONTROL', value: 85 },
		{ type: 'skill', name: 'DEBUGGING & BUILD TOOLING', value: 87 },
		{ type: 'skill', name: 'DOCKER & CONTAINERS', value: 78 },

		{ type: 'skill', name: 'ALGORITHMS & DATA STRUCTURES', value: 90 },
		{ type: 'skill', name: 'SYSTEM PROGRAMMING (POSIX, PROCESSES)', value: 92 },
		{ type: 'skill', name: 'NETWORK ARCHITECTURE & SOCKETS', value: 82 },
		{ type: 'skill', name: 'WEB SERVERS & CLIENT-SERVER BASICS', value: 80 },

		{ type: 'skill', name: 'FULL-STACK BASICS (FRONTEND & BACKEND)', value: 75 },
		{ type: 'skill', name: 'DATABASE FUNDAMENTALS (SQL/NoSQL)', value: 70 },

		{ type: 'skill', name: 'PROBLEM SOLVING & CRITICAL THINKING', value: 92 },
		{ type: 'skill', name: 'PEER-TO-PEER LEARNING & COLLABORATION', value: 90 },
		{ type: 'skill', name: 'TIME MANAGEMENT & AUTONOMY', value: 88 }
	]
	}
  }

  return (
    <div className="page-container about-page">
      <div className="page-header">
        <h1 className="page-title">ABOUT ME</h1>
      </div>

      <div className="about-stats-container">
        <div className="stats-menu">
          {categoryOrder.map((category, index) => (
            <div
              key={index}
              className={`stats-menu-item ${selectedCategory === category && !isBackButtonSelected ? 'active' : ''}`}
              onMouseEnter={() => {
                if (!isUsingKeyboard) {
                  playNavigate()
                  setSelectedCategory(category)
                  setIsBackButtonSelected(false)
                }
              }}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="stats-content">
          <div 
            className={`stats-content-scroll ${selectedCategory === 'WHO I AM' ? 'no-scroll' : ''} ${selectedCategory === 'SKILLS' ? 'infinite-scroll' : ''}`}
            key={selectedCategory}
          >
            {selectedCategory === 'SKILLS' 
              ? [...categories[selectedCategory].content, ...categories[selectedCategory].content].map((item, index) => (
                <div key={index} className="stats-line skill-item">
                  <span className="skill-label">{item.name}</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar-fill" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))
              : categories[selectedCategory].content.map((line, index) => {
                  if (typeof line === 'object' && line.type === 'image') {
                    return (
                      <div key={index} className="stats-image-container">
                        <img src={line.src} alt={line.alt} className="stats-image" />
                      </div>
                    )
                  }
                  if (typeof line === 'object' && line.type === 'link') {
                    return (
                      <div key={index} className="stats-line stats-link">
                        <a href={line.url} target="_blank" rel="noopener noreferrer">
                          {line.text}
                        </a>
                      </div>
                    )
                  }
                  
                  if (typeof line === 'string' && line.trim().startsWith('--') && line.trim().endsWith('--')) {
                    return (
                      <div
                        key={index}
                        className="stats-line stats-header"
                      >
                        {line}
                      </div>
                    )
                  }
                  
                  if (typeof line === 'string' && /^[A-Z\s]+:/.test(line)) {
                    const colonIndex = line.indexOf(':')
                    const label = line.substring(0, colonIndex + 1)
                    const value = line.substring(colonIndex + 1)
                    return (
                      <div
                        key={index}
                        className="stats-line"
                      >
                        <span className="stats-label">{label}</span>
                        <span className="stats-value">{value}</span>
                      </div>
                    )
                  }
                  
                  return (
                    <div
                      key={index}
                      className="stats-line"
                    >
                      {line || '\u00A0'}
                    </div>
                  )
                })
            }
          </div>
        </div>
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

export default About
