import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">Speed Up</div>
      <div className="nav-right">
        <Link to="/home" className="user-button">
          <span className="user-icon">👤</span>
          {userName}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
