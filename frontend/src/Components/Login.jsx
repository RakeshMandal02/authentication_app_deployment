import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { decodeJwt } from '../utils/jwt'
import '../styles/Login.css'

async function loginUser(data) {
 const res = await fetch('https://authentication-system-deployment-api.vercel.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message)
        localStorage.setItem('jwtToken', data.jwtToken) // Store token in localStorage
        const decodedToken = decodeJwt(data.jwtToken)
        if (decodedToken?.role === 'admin') {
          navigate('/admin', { replace: true })
        } else {
          navigate('/home', { replace: true })
        }
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed. Please try again.')
    }
  })

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(loginData)
  }

  return (
    <>
      <h1 className="register-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={mutation.isLoading}>Login</button>
        <span>Do not have an account? <Link to='/register'>Register</Link></span>
      </form>

      <ToastContainer />
    </>
  )
}

export default Login
