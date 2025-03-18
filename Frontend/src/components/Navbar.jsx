import React from 'react'
import Logo from './Logo'

function Navbar() {
  return (
    <nav className=' px-5 py-3 shadow-xl'>
        <div className='container mx-auto flex items-center justify-between'>

      <Logo />
      <div>
        user
      </div>
        </div>
    </nav>
  )
}

export default Navbar
