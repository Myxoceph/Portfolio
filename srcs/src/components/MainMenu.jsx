import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MainMenu.css'

const MainMenu = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const menuItems = [
    { label: 'PROJECTS', path: '/projects' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : menuItems.length - 1)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => prev < menuItems.length - 1 ? prev + 1 : 0)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect(menuItems[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

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
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => handleSelect(item)}
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
    </div>
  )
}

export default MainMenu
