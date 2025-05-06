import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import '../styles/Register.css'


async function registerUser(data) {
    const res = await fetch('https://authentication-system-deployment-api.vercel.app/api/auth/register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }) 
    return res.json()
}

const Register = () => {
  const [registrationData, setRegistrationData] = useState({username: '',email: '',password: ''})

  const mutation = useMutation({
      mutationFn: registerUser,
      onSuccess: (data) => {
          if(data.success === false) {
              toast.error(data.message)  
          }else{
              toast.success(data.message)
          }
      },
      onError: () => {
          toast.error('Registration failed') 
      }
  })

  const handleChange = (e) => {
      setRegistrationData({...registrationData,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      mutation.mutate(registrationData)
  }

  return(
      
      <div>
          <h1 className="register-heading">Registration Page</h1>
         <form onSubmit={handleSubmit}>
          <input 
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          value={registrationData.username}
          required
          />
          <input 
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={registrationData.email}
          required
          />
          <input 
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={registrationData.password}
          />
          <button type="submit" disabled={mutation.isLoading}>Register</button>
          <span>Already Registered? 
              <Link to="/login">Login</Link>
          </span>
         </form>
         <ToastContainer />
      </div>
      
  )
}
export default Register
