import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ScoreHistory from "./ScoreHistory";

const Home = ({ setUserName, userLoggedOut, userName }) => {
  const [name, setName] = useState("");
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(name);
    localStorage.setItem("username", name);
    navigate("/game");
  };

  const handleStop = () => {
    navigate("/game");
  };

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(savedScores);
  });

  return (
    <div className="home">
      <h1>Speed Up Your Calculation</h1>
      {userName && (
        <div className="main">
          <div className="user-info">
            <p>Current User: {userName}</p>
            <button className="logout-button" onClick={userLoggedOut}>
              Logout
            </button>
          </div>
          <div className="score">
            <ScoreHistory scores={scores} />
          </div>
          <button type="submit" onClick={handleStop}>
            Continue Game
          </button>
        </div>
      )}
      {!userName && (
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
      )}
    </div>
  );
};

export default Home;
