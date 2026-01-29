import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Projects from './pages/Projects'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
