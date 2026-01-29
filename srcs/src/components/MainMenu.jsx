import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useSound from '../hooks/useSound'
import Footer from './Footer'
import './MainMenu.css'

const MainMenu = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)
  const { playNavigate, playSelect } = useSound()
  
  const menuItems = [
    { label: 'PROJECTS', path: '/projects' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : menuItems.length - 1)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setIsUsingKeyboard(true)
        playNavigate()
        setSelectedIndex(prev => prev < menuItems.length - 1 ? prev + 1 : 0)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        playSelect()
        handleSelect(menuItems[selectedIndex])
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
  }, [selectedIndex, playNavigate, playSelect])

  const handleSelect = (item) => {
    navigate(item.path)
  }

  return (
    <div className="main-menu">
      <div className="logo-container">
        <img src="/IMG_6435.png" alt="42 Kocaeli" />
      </div>
      
      <div className="logo-container-bottom">
        <img src="/IMG_6918.png" alt="Portfolio" />
      </div>
      
      <div className="welcome-text">Welcome</div>
      
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
            onMouseEnter={() => {
              if (!isUsingKeyboard) {
                playNavigate()
                setSelectedIndex(index)
              }
            }}
            onClick={() => {
              playSelect()
              handleSelect(item)
            }}
          >
            <span className="menu-item-text">{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="gta-footer">
        <div className="gta-controls">
          Press ENTER or Click to Select
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MainMenu
