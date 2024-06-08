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

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(savedScores);
  })


  return (
    <div className="home">
      <h1>Speed Up Your Calculation</h1>
      {userName && (
        <>
        <div className="user-info">
          <p>Current User: {userName}</p>
          <button className="logout-button" onClick={userLoggedOut}>
            Logout
          </button>
        </div>
        <ScoreHistory scores={scores}/>
        </>
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
