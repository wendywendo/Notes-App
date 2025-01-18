import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import './Home.css'


export default function Home() {

  const { user } = useContext(UserContext)

  return (
      <section className="hero">
          <div className="container">
              <div className="hero-content">
                  <h1>Unleash Your Creativity with NoteWave</h1>
                  <p>Dive into a world of limitless possibilities. Capture, organize, and bring your ideas to life with our revolutionary note-taking app.</p>
                  <a href={ user ? "/dashboard" : "/login" } className="cta-button">Start Your Journey</a>
              </div>
          </div>
      </section>
  )
}
