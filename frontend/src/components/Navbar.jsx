import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: 'white',
    width:"100%"
  };
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
  };
  return (
    <nav >
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/About'>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;