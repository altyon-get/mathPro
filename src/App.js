import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import MathQuiz from "./components/MathQuiz";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [userName, setUserName] = useState(localStorage.getItem('username') || "");

  const userLoggedOut = () => {
    localStorage.removeItem('username');
    setUserName("");
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar userName={userName} />
        <Routes>
          <Route path="/home" element={<Home setUserName={setUserName} userLoggedOut={userLoggedOut} userName={userName}/>} />
          <Route path="/game" element={<MathQuiz userName={userName} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
