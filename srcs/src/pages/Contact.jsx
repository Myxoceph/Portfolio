import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setIsBackButtonSelected(prev => !prev)
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
  }, [isBackButtonSelected, navigate])

  const contactLinks = [
    {
      name: 'EMAIL',
      value: 'ahmetbakircan@gmail.com',
      link: 'mailto:ahmetbakircan@gmail.com',
      icon: '📧'
    },
    {
      name: 'GITHUB',
      value: 'Myxoceph',
      link: 'https://github.com/myxoceph',
      icon: '💻'
    },
    {
      name: 'LINKEDIN',
      value: 'Ahmet BAKIRCAN',
      link: 'https://linkedin.com/in/ahmet-bakircan',
      icon: '💼'
    }
  ]

  return (
    <div className="page-container contact-page">
      <div className="page-header">
        <h1 className="page-title">CONTACT</h1>
      </div>

      <div className="contact-content">
        <p className="contact-intro">
          Interested in collaborating or want to discuss a project? Feel free to reach out!
        </p>

        <div className="contact-links">
          {contactLinks.map((contact, index) => (
            <a 
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">{contact.icon}</div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-value">{contact.value}</div>
              </div>
            </a>
          ))}
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

export default Contact
