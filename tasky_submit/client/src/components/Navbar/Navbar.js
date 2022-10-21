import React from 'react'
import { Link } from "react-router-dom"
import "../Navbar/Navbar.css"
function Navbar() {
  return (
    <>
      <header className='navbar'>

        <Link to="/" id="logo" className='navbar_title '>my-tasky</Link>
        <div>
          <Link to="#"> LOGOUT </Link>
          <Link to="#"> ABOUT </Link>
          <Link to="/Login"> HOME </Link>
        </div>
      </header>
    </>

  )
}

export default Navbar