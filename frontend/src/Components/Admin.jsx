import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../styles/Admin.css'
// Centralized fetch wrapper to handle token expiration and errors
async function authFetch(url, options = {}) {
  const token = localStorage.getItem('jwtToken')
  if (!token) {
    // Redirect to login immediately if no token found
    window.location.href = '/login'
    throw new Error('No token found, please login again')
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
  })

  if (res.status === 401) {
    localStorage.removeItem('jwtToken')
    window.location.href = '/login'
    throw new Error('Session expired, please login again')
  }

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || 'Request failed')
  }

  return res.json()
}

const fetchPendingUsers = () => authFetch('https://authentication-app-deployment-api.vercel.app/api/auth/pending', { method: 'GET' })

const approveUser = (userId) => authFetch(`https://authentication-app-deployment-api.vercel.app/api/auth/approve/${userId}`, { method: 'PUT' })

function Admin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data, error, isLoading } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: fetchPendingUsers,
    retry: false,
    onError: (error) => {
      toast.error('Error fetching pending users: ' + error.message)
      console.error('Fetch pending users error:', error)
      if (error.message.includes('Session expired') || error.message.includes('No token found')) {
        localStorage.removeItem('jwtToken')
        navigate('/login', { replace: true })
      }
    },
  })

  const mutation = useMutation({
    mutationFn: approveUser,
    onSuccess: () => {
      toast.success('User approved successfully')
      queryClient.invalidateQueries(['pendingUsers'])
    },
    onError: (error) => {
      toast.error('Approve user error: ' + error.message)
      console.error('Approve user error:', error)
      if (error.message.includes('Session expired') || error.message.includes('No token found')) {
        localStorage.removeItem('jwtToken')
        navigate('/login', { replace: true })
      }
    },
  })

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    navigate('/login', { replace: true })
  }

  if (isLoading) return <p>Loading pending users...</p>
  if (error) return <p>Error loading users: {error.message}</p>

  const pendingUsers = data?.users || []

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {pendingUsers.length === 0 ? (
        <p>No users pending approval.</p>
      ) : (
        <ul className="pending-users-list">
          {pendingUsers.map((user) => (
            <li key={user._id} className="pending-user-item">
              <span>{user.username} ({user.email})</span>
              <button
                onClick={() => mutation.mutate(user._id)}
                disabled={mutation.isLoading}
                className="approve-button"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Admin
