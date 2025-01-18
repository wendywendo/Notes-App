import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import './Register.css'

export default function Register() {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({ name: '', email: '', password: ''})

  const registerUser = async (e) => {
    e.preventDefault()

    const { name, email, password } = userData

    try {
      const {data} = await axios.post('/register', {
        name, email, password
      })

      if (data.error) {
        toast.error(data.error)
      } else {
        setUserData({ name: '', email: '', password: '' })
        toast.success('User created successfully. Redirecting to login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="registerPage">
      <form onSubmit={(e) => registerUser(e)}>
        <FaUser className="user-icon" />
        <h2>REGISTER</h2>

        <div className="formItem">
          <div>
            <FaUser/>
            <label>Name</label>
          </div>

          <input 
            type="text" 
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            required={true}
          />
        </div>
        
        <div className="formItem">
          <div>
            <FaUser />
            <label>Email</label>
          </div>

          <input 
            type="email" 
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            required={true}
          />
        </div>

        <div className="formItem">
          <div>
            <FaLock />
            <label>Password</label>
          </div>

          <input 
            type="password" 
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            required={true}
          />
        </div>

        <button type="submit">JOIN US</button>
      </form> 
    </div>
  )
}
