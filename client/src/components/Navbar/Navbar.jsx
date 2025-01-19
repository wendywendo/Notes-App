import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import './Navbar.css'

export default function Navbar() {

  const { user } = useContext(UserContext)

  const logoutUser = async () => {
    await axios.post('/logout')
    toast('Successfully logged out!')
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        { !user ? (
          <div className='auth'>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className='auth'>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </nav>
      <ToastContainer />
    </>
  )
}
