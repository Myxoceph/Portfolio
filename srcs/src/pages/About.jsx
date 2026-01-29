import { useNavigate } from 'react-router-dom'
import './About.css'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container about-page">
      <div className="page-header">
        <h1 className="page-title">ABOUT ME</h1>
        <div className="page-subtitle">WHO I AM</div>
      </div>

      <div className="about-content">
        <div className="about-card">
          <div className="stat-box">
            <div className="stat-label">NAME</div>
            <div className="stat-value">Your Name</div>
          </div>
          
          <div className="stat-box">
            <div className="stat-label">ROLE</div>
            <div className="stat-value">Full Stack Developer</div>
          </div>
          
          <div className="stat-box">
            <div className="stat-label">LEVEL</div>
            <div className="stat-value">★★★★★</div>
          </div>
        </div>

        <div className="about-description">
          <h2 className="section-title">SKILLS</h2>
          <div className="skills-container">
            <div className="skill-bar">
              <span className="skill-name">React</span>
              <div className="skill-progress">
                <div className="skill-fill" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <span className="skill-name">Node.js</span>
              <div className="skill-progress">
                <div className="skill-fill" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <span className="skill-name">JavaScript</span>
              <div className="skill-progress">
                <div className="skill-fill" style={{width: '95%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <span className="skill-name">CSS/HTML</span>
              <div className="skill-progress">
                <div className="skill-fill" style={{width: '88%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        <span>← BACK TO MENU</span>
      </button>
    </div>
  )
}

export default About
