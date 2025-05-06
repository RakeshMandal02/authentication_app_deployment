import React from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeJwt } from '../utils/jwt'

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken')
  let username = ''

  if (token) {
    const decoded = decodeJwt(token)
    username = decoded?.username || ''
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
