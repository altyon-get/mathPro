import React, { useState, useEffect } from "react";
import "./MathQuiz.css";
import Numpad from "./Numpad";
import ScoreHistory from "./ScoreHistory";
import { useNavigate } from "react-router-dom";

const MathQuiz = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [scores, setScores] = useState([]);
  const [showNumpad, setShowNumpad] = useState(true);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateNewQuestion();
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(savedScores);
  }, []);

  const generateNewQuestion = () => {
    const n1 = Math.floor(Math.random() * 90) + 10;
    const n2 = Math.floor(Math.random() * 90) + 10;
    setNum1(n1);
    setNum2(n2);
    setAnswer("");
    setStartTime(Date.now());
    setFeedback("");
  };

  const handleSubmit = () => {
    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(answer, 10);
    const endTime = Date.now();
    const timeDiff = (endTime - startTime) / 1000;

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setTimeTaken(timeDiff);
      const newScores = [
        ...scores,
        { question: `${num1} + ${num2}`, time: timeDiff },
      ];
      // const latestScores = newScores.slice(-10);
      // const newScores = [...scores, { question: `${num1} + ${num2}`, time: timeDiff }];
      const sortedScores = newScores.sort((a, b) => a.time - b.time); // Sort scores in increasing order of time
      const latestScores = sortedScores.slice(-10);
      setScores(latestScores);
      localStorage.setItem("scores", JSON.stringify(latestScores));
      setTimeout(generateNewQuestion, 1000); // Delay for showing correct feedback
    } else if (answer.length === correctAnswer.toString().length) {
      setFeedback("Incorrect! Try again.");
      setTimeout(() => {
        setAnswer("");
        setFeedback("");
      }, 1000);
    }
  };

  const handleClick = (num) => {
    if (num === "<") {
      if(answer.length > 0)
      setAnswer(answer.slice(0, -1));
    } else if (num === "CC") {
      setAnswer("");
    } else {
      setAnswer(answer + num);
    }
  };

  const handleClear = () => {
    setAnswer("");
  };

  const handleClearAll = () => {
    setAnswer("");
    setFeedback("");
  };

  const handleStop = () => {
    navigate("/home");
  };

  const handleRestart = () => {
    generateNewQuestion();
  };

  useEffect(() => {
    if (answer.length > 0) {
      handleSubmit();
    }
  }, [answer]);

  return (
    <div className="app-container">
      <div className="content">
        <div className="game-section">
          <div className="question">
            {num1} + {num2} =
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          {feedback && (
            <p
              className={`feedback ${
                feedback === "Correct!" ? "correct" : "incorrect"
              }`}
            >
              {feedback}
            </p>
          )}
          {timeTaken !== null && (
            <p>Time taken: {timeTaken.toFixed(2)} seconds</p>
          )}
          {/* <button className="numpad-toggle" onClick={() => setShowNumpad(!showNumpad)}>Toggle Numpad</button> */}
          {showNumpad && <Numpad onClick={(num) => handleClick(num)} />}
        </div>
        <div className="history-section">
          {/* <ScoreHistory scores={scores} /> */}
          <div className="buttons">
            <button className="stop-button" onClick={handleStop}>
              Stop
            </button>
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;
