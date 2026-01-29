import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
