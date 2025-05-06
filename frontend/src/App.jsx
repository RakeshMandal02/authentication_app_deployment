import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login'
import Admin from './Components/Admin'
import Home from './Components/Home'
import Register from './Components/Register'
import NavigationGuard from './Components/NavigationGuard'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    
      <NavigationGuard>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          {/* Redirect any unknown routes to register */}
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </NavigationGuard>
    
  )
}

export default App
