import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeData } from './utils/storage.js'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Books from './pages/Books.jsx'
import Transactions from './pages/Transactions.jsx'
import Users from './pages/Users.jsx'

function App() {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><><Navbar /><Navigate to="/dashboard" replace /></></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><><Navbar /><Dashboard /></></ProtectedRoute>} />
      <Route path="/books" element={<ProtectedRoute><><Navbar /><Books /></></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><><Navbar /><Transactions /></></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><><Navbar /><Users /></></ProtectedRoute>} />
    </Routes>
  )
}

export default App