import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import useSound from '../hooks/useSound'
import Footer from '../components/Footer'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)
  const { playNavigate, playSelect } = useSound()
  const backButtonRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    if (isBackButtonSelected && backButtonRef.current) {
      backButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else if (!isBackButtonSelected && cardRefs.current[selectedCardIndex]) {
      cardRefs.current[selectedCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isBackButtonSelected, selectedCardIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedCardIndex(0)
        } else if (selectedCardIndex < contactLinks.length - 1) {
          setSelectedCardIndex(prev => prev + 1)
        } else {
          setIsBackButtonSelected(true)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedCardIndex(contactLinks.length - 1)
        } else if (selectedCardIndex > 0) {
          setSelectedCardIndex(prev => prev - 1)
        } else {
          setIsBackButtonSelected(true)
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSelect()
        if (isBackButtonSelected) {
          navigate('/')
        } else {
          window.open(contactLinks[selectedCardIndex].link, '_blank')
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
  }, [isBackButtonSelected, selectedCardIndex, navigate, playNavigate, playSelect])

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
              ref={el => cardRefs.current[index] = el}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card ${selectedCardIndex === index && !isBackButtonSelected ? 'selected' : ''}`}
              onMouseEnter={() => {
                if (!isUsingKeyboard) {
                  playNavigate()
                  setSelectedCardIndex(index)
                  setIsBackButtonSelected(false)
                }
              }}
              onClick={(e) => {
                e.preventDefault()
                playSelect()
                window.open(contact.link, '_blank')
              }}
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

export default Contact
