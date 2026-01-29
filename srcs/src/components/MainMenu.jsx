import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './MainMenu.css'

const MainMenu = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const menuItems = [
    { label: 'PROJECTS', path: '/projects' },
    { label: 'ABOUT', path: '/about' },
    { label: 'EXIT', action: 'exit' }
  ]

  const handleSelect = (item) => {
    if (item.action === 'exit') {
      window.location.href = 'about:blank'
    } else {
      navigate(item.path)
    }
  }

  return (
    <div className="main-menu">
      <div className="logo-container">
        <img src="/42kocaeli.webp" alt="42 Kocaeli" />
      </div>
      
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
