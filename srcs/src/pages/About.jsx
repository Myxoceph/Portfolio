import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './About.css'

const About = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('WHO I AM')
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)

  const categoryOrder = ['WHO I AM', 'MY STORY', '42', 'SKILLS']

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = categoryOrder.indexOf(selectedCategory)
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedCategory(categoryOrder[categoryOrder.length - 1])
        } else {
          const newIndex = currentIndex > 0 ? currentIndex - 1 : categoryOrder.length - 1
          setSelectedCategory(categoryOrder[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
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
        if (isBackButtonSelected) {
          navigate('/')
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        navigate('/')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCategory, isBackButtonSelected, navigate])

  const categories = {
    'WHO I AM': {
      content: [
        'NAME: Ahmet BAKIRCAN',
        'ROLE: 42 Kocaeli Student',
        'LEVEL: Level 6',
        'PROJECTS COMPLETED: 20',
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
        'My fascination with technology started at a young age. While other kids were playing outside, I was captivated by how things worked behind the screen.',
        '',
        'What started as simple troubleshooting evolved into a genuine curiosity about how software is built.',
        '',
        '-- DISCOVERING MY PASSION --',
        '',
        'As I delved deeper into programming, I realized it was more than just a hobby. It was my passion.',
        '',
        'I started with the basics: HTML, CSS, and JavaScript. But I wanted more than just surface-level knowledge.',
        '',
        '-- FINDING ECOLE 42 --',
        '',
        'That is when I discovered Ecole 42. The concept immediately resonated with me: no teachers, no traditional lectures, just projects and peer-to-peer learning.',
        '',
        'The Piscine was one of the most challenging experiences of my life, but I learned more in that month than I had in years of self-study.',
        '',
        '-- LIFE AT ECOLE 42 --',
        '',
        'Since joining Ecole 42, my growth as a developer has accelerated exponentially. Each project pushes me to explore new territories.',
      ]
    },
    '42': {
      content: [
        { type: 'image', src: '/42kocaeli.webp', alt: '42 Kocaeli' },
        '',
        'The name 42 comes from "The Hitchhiker\'s Guide to the Galaxy" by Douglas Adams, where 42 is humorously presented as the "Answer to the Ultimate Question of Life, the Universe, and Everything." Founded by French entrepreneur Xavier Niel in 2013, 42 schools have 54 campuses in 31 countries with over 21,000+ students worldwide. 42 is not just a place to learn coding; it\'s a community where innovation thrives, collaboration is key, and students are empowered to take charge of their own learning journey. 42 teaches students to write clean, efficient code that adheres to norminette standards, fostering a strong foundation in programming best practices. It also provides students with real-world projects that challenge their skills and encourage creativity. You can learn more about 42 on the official website:',
        { type: 'link', url: 'https://42.fr/', text: 'https://42.fr/' },
      ]
    },
    'SKILLS': {
      content: [
        { type: 'skill', name: 'C PROGRAMMING', value: 95 },
        { type: 'skill', name: 'C++', value: 85 },
        { type: 'skill', name: 'ALGORITHMS & DATA STRUCTURES', value: 90 },
        { type: 'skill', name: 'UNIX/LINUX SYSTEMS', value: 88 },
        { type: 'skill', name: 'JAVASCRIPT & REACT', value: 80 },
        { type: 'skill', name: 'SYSTEM PROGRAMMING', value: 92 },
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
              className={`stats-menu-item ${selectedCategory === category ? 'active' : ''}`}
              onMouseEnter={() => setSelectedCategory(category)}
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
                  
                  // Check if line is a section header (starts and ends with --)
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
                  
                  // Check if line contains a colon (label: value format)
                  // Only match if it starts with uppercase letters followed by colon (e.g., "NAME:", "ROLE:")
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
        className={`back-button ${isBackButtonSelected ? 'selected' : ''}`}
        onClick={() => navigate('/')}
        onMouseEnter={() => setIsBackButtonSelected(true)}
        onMouseLeave={() => setIsBackButtonSelected(false)}
      >
        <span>← BACK TO MENU</span>
      </button>
    </div>
  )
}

export default About
