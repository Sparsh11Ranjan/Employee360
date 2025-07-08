import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <div className='flex items-center justify-between h-14 bg-cyan-900 px-6 shadow-md text-white rounded-b-lg'>
  <p className="text-lg font-medium">Welcome, {user.name}</p>
  <button className='px-4 py-1.5 bg-cyan-700 hover:bg-cyan-800 rounded text-sm font-medium transition'
  onClick={logout}>
    Logout
  </button>
</div>

  )
}

export default Navbar