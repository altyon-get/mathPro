import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ setUserName }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(name);
    navigate('/game');
  };

  return (
    <div className="home">
      <h1>Speed Up Your Calculation</h1>
      <div className="user-info">
        {localStorage.getItem('username') && (
          <div className="current-user">
            <p>Current User: {localStorage.getItem('username')}</p>
            <p>Highest Score: {localStorage.getItem('highestScore')}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Start Game</button>
        </form>
        {localStorage.getItem('username') && (
          <button className="logout-button" onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('highestScore');
            setUserName('');
          }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
