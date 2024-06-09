import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userName, operation, setOperation }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOperationChange = (op) => {
    setOperation(op);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">Speed Up</div>
      <div className="operation-selection">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            {operation}
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleOperationChange("addition")}>Addition</button>
              <button onClick={() => handleOperationChange("subtraction")}>Subtraction</button>
              <button onClick={() => handleOperationChange("lcm")}>LCM</button>
            </div>
          )}
        </div>
      </div>
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
