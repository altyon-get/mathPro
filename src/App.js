import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import MathQuiz from "./components/MathQuiz";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  const userLoggedOut = () => {
    localStorage.removeItem("username");
    setUserName("");
  };

  const [operation, setOperation] = useState("addition");

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
    generateNewQuestion(); // Generate a new question when operation changes
  };

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

  return (
    <Router>
      <div className="app-container">
        <Navbar
          userName={userName}
          operation={operation}
          setOperation={setOperation}
          onOperationChange={handleOperationChange}
        />
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                setUserName={setUserName}
                userLoggedOut={userLoggedOut}
                userName={userName}
              />
            }
          />
          <Route
            path="/game"
            element={
              <MathQuiz
                // userName={userName}
                num1={num1}
                num2={num2}
                answer={answer}
                setAnswer={setAnswer}
                startTime={startTime}
                timeTaken={timeTaken}
                setTimeTaken={setTimeTaken}
                feedback={feedback}
                setFeedback={setFeedback}
                operation={operation}
                setOperation={setOperation}
                onGenerateNewQuestion={generateNewQuestion}
              />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
