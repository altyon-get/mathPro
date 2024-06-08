import React from 'react';
import './ScoreHistory.css';

const ScoreHistory = ({ scores }) => {
  return (
    <div className="score-history">
      <h2>Previous Scores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index} className={index === 0 ? 'top-score' : ''}>
            {score.question} - {score.time.toFixed(2)} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreHistory;
