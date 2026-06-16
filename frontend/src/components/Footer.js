import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <nav className="footer-navbar">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/reels">Reels</Link>
          </div>
          <div>
            <Link to="/messages">Messages</Link>
          </div>
          <div>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        </nav>
      </footer>
  )
}

export default Footer