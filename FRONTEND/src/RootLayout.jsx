import React from 'react'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  return (
    <div className="bg-animated" style={{ minHeight: '100vh' }}>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout