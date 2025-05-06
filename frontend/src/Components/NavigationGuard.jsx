import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { decodeJwt } from '../utils/jwt'

const NavigationGuard = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      // Not logged in, allow navigation anywhere
      setAuthorized(true)
      return
    }
    let decoded
    try {
      decoded = decodeJwt(token)
    } catch {
      // Invalid token, allow navigation anywhere
      setAuthorized(true)
      return
    }

    const role = decoded?.role
    const path = location.pathname.toLowerCase()

    // Define allowed paths per role
    const allowedPaths = {
      admin: ['/admin'],
      user: ['/home'],
    }

    if (role === 'admin' && !allowedPaths.admin.includes(path)) {
      navigate('/admin', { replace: true })
      setAuthorized(false)
    } else if (role !== 'admin' && !allowedPaths.user.includes(path)) {
      navigate('/home', { replace: true })
      setAuthorized(false)
    } else {
      setAuthorized(true)
    }
  }, [location, navigate])

  if (!authorized) {
    // Render nothing or a loading indicator while redirecting
    return null
  }

  return children
}

export default NavigationGuard
