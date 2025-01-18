import { useState } from "react"
import axios from 'axios'
import { FaUser, FaLock } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import './Login.css'

export default function Login() {

  const [userData, setUserData] = useState({ email: "", password: ""})

  const loginUser = async (e) => {
    e.preventDefault()

    const { email, password } = userData

    try {
      const {data} = await axios.post('/login', {
        email, password
      }, { withCredentials: true })

      if (data.error) {
        toast.error(data.error)
      } else { 
        setUserData({ email: '', password: '' })
        toast.success('Login successful. Redirecting...')
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="loginPage">
    
      <form onSubmit={(e) => loginUser(e)}>
        <FaUser className="user-icon" />
        <h2>LOGIN</h2>
        
        <div className="formItem">
          <div>
            <FaUser/>
            <label>Email</label>
          </div>

          <input 
            type="email" 
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
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
          />
        </div>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}
