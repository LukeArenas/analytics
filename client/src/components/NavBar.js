import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Navbar.css'

const NavBar = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  return (
    <header className="navbar">
      <div className="logo">
        <h1>ABC Industries</h1>
      </div>
      <button onClick={() => handleClick()}>Home</button>
    </header>
  )
}

export default NavBar
