import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import useSound from '../hooks/useSound'
import Footer from '../components/Footer'
import './Resume.css'

const Resume = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isBackButtonSelected, setIsBackButtonSelected] = useState(false)
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)
  const { playNavigate, playSelect } = useSound()
  const backButtonRef = useRef(null)
  const resumeRefs = useRef([])

  useEffect(() => {
    if (isBackButtonSelected && backButtonRef.current) {
      backButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else if (!isBackButtonSelected && resumeRefs.current[selectedIndex]) {
      resumeRefs.current[selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
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
          setSelectedIndex(resumes.length - 1)
        } else {
          setSelectedIndex(prev => prev > 0 ? prev - 1 : resumes.length - 1)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        if (isBackButtonSelected) {
          setIsBackButtonSelected(false)
          setSelectedIndex(0)
        } else {
          if (selectedIndex === resumes.length - 1) {
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
          setSelectedIndex(prev => prev >= 2 ? prev - 2 : prev)
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (!isBackButtonSelected) {
          setIsUsingKeyboard(true)
          playNavigate()
          setSelectedIndex(prev => prev < resumes.length - 2 ? prev + 2 : prev)
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSelect()
        if (isBackButtonSelected) {
          navigate('/')
        } else {
          const selectedResume = resumes[selectedIndex]
          const link = document.createElement('a')
          link.href = selectedResume.file
          link.download = selectedResume.filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
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

  const resumes = [
    {
      title: 'English Resume',
      subtitle: 'With Photo',
      description: 'Professional resume in English including profile picture.',
      file: '/resumes/CV_EN_w_photo.pdf',
      filename: 'Ahmet_Bakircan_CV_EN.pdf',
      emoji: '🇬🇧',
      flag: '📷'
    },
    {
      title: 'English Resume',
      subtitle: 'Without Photo',
      description: 'Professional resume in English without profile picture.',
      file: '/resumes/CV_EN_wo_photo.pdf',
      filename: 'Ahmet_Bakircan_CV_EN_No_Photo.pdf',
      emoji: '🇬🇧',
      flag: '📄'
    },
    {
      title: 'Turkish Resume',
      subtitle: 'With Photo',
      description: 'Türkçe profesyonel özgeçmiş, fotoğraf içerir.',
      file: '/resumes/CV_TR_w_photo.pdf',
      filename: 'Ahmet_Bakircan_CV_TR.pdf',
      emoji: '🇹🇷',
      flag: '📷'
    },
    {
      title: 'Turkish Resume',
      subtitle: 'Without Photo',
      description: 'Türkçe profesyonel özgeçmiş, fotoğraf içermez.',
      file: '/resumes/CV_TR_wo_photo.pdf',
      filename: 'Ahmet_Bakircan_CV_TR_No_Photo.pdf',
      emoji: '🇹🇷',
      flag: '📄'
    }
  ]

  const handleDownload = (resume) => {
    playSelect()
    const link = document.createElement('a')
    link.href = resume.file
    link.download = resume.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="page-container resume-page">
      <div className="page-header">
        <h1 className="page-title">RESUME</h1>
      </div>

      <div className="resume-grid">
        {resumes.map((resume, index) => (
          <div 
            key={index}
            ref={el => resumeRefs.current[index] = el}
            className={`resume-card ${selectedIndex === index && !isBackButtonSelected ? 'selected' : ''}`}
            onMouseEnter={() => {
              if (!isUsingKeyboard) {
                playNavigate()
                setSelectedIndex(index)
                setIsBackButtonSelected(false)
              }
            }}
            onClick={() => handleDownload(resume)}
          >
            <div className="resume-flags">
              <span className="resume-emoji">{resume.emoji}</span>
              <span className="resume-flag">{resume.flag}</span>
            </div>
            <h2 className="resume-title">{resume.title}</h2>
            <h3 className="resume-subtitle">{resume.subtitle}</h3>
            <p className="resume-description">{resume.description}</p>
            <div className="resume-download-icon">⬇️</div>
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

export default Resume
