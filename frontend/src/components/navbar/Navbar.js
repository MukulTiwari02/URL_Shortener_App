import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({logout, isLogin}) => {


  return (
    <nav className="nav-container --flex-between">
        <div className="logo --flex-center">
          <h1>URL Shortener</h1>
        </div>
        <ul className="home-links --flex-between">
          {!isLogin && <li>
            <Link className='register' to="/register">Register</Link>
          </li>}
          {!isLogin && <li>           
              <Link to="/login"><button className="--btn button --btn-btn">Login</button></Link>            
          </li>}          
          {isLogin && <li>            
              <Link to="/dashboard"><button className="--btn button --btn-btn">Dashboard</button></Link> 
          </li> }
          {isLogin && <li>            
              <Link to="/login"><button className="--btn button --btn-logout" onClick={logout}>Logout</button></Link>
          </li>}
        </ul>
      </nav>
  )
}

export default Navbar