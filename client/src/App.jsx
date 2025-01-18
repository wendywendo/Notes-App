import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import axios from 'axios'
import { UserContextProvider } from '../context/UserContext'
import Dashboard from './pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'


axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
