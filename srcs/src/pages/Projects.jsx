import { useNavigate } from 'react-router-dom'
import './Projects.css'

const Projects = () => {
  const navigate = useNavigate()

  const projects = [
    {
      title: 'Project Alpha',
      description: 'A revolutionary web application',
      tech: 'React, Node.js, MongoDB'
    },
    {
      title: 'Project Beta',
      description: 'Mobile-first responsive design',
      tech: 'React Native, Firebase'
    },
    {
      title: 'Project Gamma',
      description: 'Full-stack e-commerce platform',
      tech: 'React, Express, PostgreSQL'
    }
  ]

  return (
    <div className="page-container projects-page">
      <div className="page-header">
        <h1 className="page-title">PROJECTS</h1>
        <div className="page-subtitle">MY WORK</div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-number">#{index + 1}</div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">{project.tech}</div>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        <span>← BACK TO MENU</span>
      </button>
    </div>
  )
}

export default Projects
