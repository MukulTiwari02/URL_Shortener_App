import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({logout}) => {
  return (
    <nav className="container --flex-between --bg-success">
        <div className="logo">
          <h1>URL Shortener</h1>
        </div>
        <ul className="home-links --flex-between">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
           <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>          
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link> 
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary --btn-danger" onClick={logout}>
              <Link to="/login">Logout</Link>
            </button>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar