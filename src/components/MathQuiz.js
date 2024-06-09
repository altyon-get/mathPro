import React, { useState, useEffect } from "react";
import "./MathQuiz.css";
import Numpad from "./Numpad";
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
  const [bestScore, setBestScore] = useState(null);
  const [operation, setOperation] = useState("addition");
  const navigate = useNavigate();

  useEffect(() => {
    generateNewQuestion();
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(savedScores);

    const savedBestScore = JSON.parse(localStorage.getItem("bestScore"));
    if (savedBestScore) {
      setBestScore(savedBestScore);
    }
  }, []);

  const generateNewQuestion = () => {
    let n1 = Math.floor(Math.random() * 90) + 10;
    let n2 = Math.floor(Math.random() * 90) + 10;

    if (operation === "subtraction" && n1 < n2) {
      [n1, n2] = [n2, n1]; // Swap n1 and n2 if n1 is less than n2 for subtraction
    }

    setNum1(n1);
    setNum2(n2);
    setAnswer("");
    setStartTime(Date.now());
    setFeedback("");
  };

  const handleSubmit = () => {
    let correctAnswer;
    if (operation === "addition") {
      correctAnswer = num1 + num2;
    } else if (operation === "subtraction") {
      correctAnswer = num1 - num2;
    } else if (operation === "lcm") {
      correctAnswer = calculateLCM(num1, num2);
    }

    const userAnswer = parseInt(answer, 10);
    const endTime = Date.now();
    const timeDiff = (endTime - startTime) / 1000;

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setTimeTaken(timeDiff);
      const newScores = [
        ...scores,
        {
          question: `${num1} ${operation === "addition" ? "+" : operation === "subtraction" ? "-" : "LCM"} ${num2}`,
          time: timeDiff,
        },
      ];
      const sortedScores = newScores.sort((a, b) => a.time - b.time); // Sort scores in increasing order of time
      const latestScores = sortedScores.slice(-10);
      setScores(latestScores);
      localStorage.setItem("scores", JSON.stringify(latestScores));

      if (!bestScore || timeDiff < bestScore.time) {
        const newBestScore = {
          question: `${num1} ${operation === "addition" ? "+" : operation === "subtraction" ? "-" : "LCM"} ${num2}`,
          time: timeDiff,
        };
        setBestScore(newBestScore);
        localStorage.setItem("bestScore", JSON.stringify(newBestScore));
      }

      setTimeout(generateNewQuestion, 1000); // Delay for showing correct feedback
    } else if (answer.length === correctAnswer.toString().length) {
      setFeedback("Incorrect! Try again.");
      setTimeout(() => {
        setAnswer("");
        setFeedback("");
      }, 1000);
    }
  };

  const calculateLCM = (a, b) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    return (a * b) / gcd(a, b);
  };

  const handleClick = (num) => {
    if (num === "<") {
      if (answer.length > 0) setAnswer(answer.slice(0, -1));
    } else if (num === "CC") {
      setAnswer("");
    } else {
      setAnswer(answer + num);
    }
  };

  const handleStop = () => {
    navigate("/home");
  };

  const handleRestart = () => {
    generateNewQuestion();
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
    generateNewQuestion(); // Generate a new question when operation changes
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
            {num1} {operation === "addition" ? "+" : operation === "subtraction" ? "-" : "LCM"} {num2} =
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
          {showNumpad && <Numpad onClick={(num) => handleClick(num)} />}
        </div>
        <div className="history-section">
          <div className="best-score">
            <h3>Best Score:</h3>
            {bestScore ? (
              <p>
                Question: {bestScore.question}, Time:{" "}
                {bestScore.time.toFixed(2)} seconds
              </p>
            ) : (
              <p>No best score yet</p>
            )}
          </div>
          <div className="buttons">
            <button className="stop-button" onClick={handleStop}>
              Stop
            </button>
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
        <div className="operation-selection">
          <h3>Select Mode:</h3>
          <label>
            <input
              type="radio"
              value="addition"
              checked={operation === "addition"}
              onChange={handleOperationChange}
            />
            Addition
          </label>
          <label>
            <input
              type="radio"
              value="subtraction"
              checked={operation === "subtraction"}
              onChange={handleOperationChange}
            />
            Subtraction
          </label>
          <label>
            <input
              type="radio"
              value="lcm"
              checked={operation === "lcm"}
              onChange={handleOperationChange}
            />
            LCM
          </label>
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;
