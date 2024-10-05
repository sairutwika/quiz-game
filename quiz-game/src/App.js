import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Ensure this import is correct
import './App.css'; // Your custom styles
import QRCode from 'react-qr-code';

const questions = [
  {
    question: "What is the capital of France?",
    options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
    correct: "C"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Saturn" },
    correct: "B"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: { A: "Indian Ocean", B: "Atlantic Ocean", C: "Arctic Ocean", D: "Pacific Ocean" },
    correct: "D"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: { A: "Charles Dickens", B: "Jane Austen", C: "William Shakespeare", D: "Mark Twain" },
    correct: "C"
  },
  {
    question: "What is the smallest prime number?",
    options: { A: "0", B: "1", C: "2", D: "3" },
    correct: "C"
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (playerAnswer === currentQuestion.correct) {
      setScore(prevScore => prevScore + 1);
      alert("Correct!");
    } else {
      alert("Wrong answer!");
    }

    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    setPlayerAnswer(""); // Reset answer input
  };

  const handleJoinGame = () => {
    setShowQR(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setPlayerName("");
    setShowQR(false);
  };

  return (
    <div className="App">
      <h1>Quiz Game</h1>
      {!showQR ? (
        <div>
          <h2>Join the Game</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleJoinGame}>Join</button>
        </div>
      ) : quizFinished ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>{playerName}, your total score is: {score} out of {questions.length}</p>
          <p>Thank you for playing!</p>
          <p>
            {score > 4
              ? "Very good!"
              : score < 2
              ? "Improve it!"
              : "Good!"}
          </p>
          <button onClick={resetQuiz}>Play Again</button>
        </div>
      ) : (
        <div>
          <QRCodeCanvas value="http://localhost:3000" />
          <h2>Current Question</h2>
          <p>{currentQuestion.question}</p>
          <form onSubmit={handleAnswerSubmit}>
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <div key={key}>
                <label>
                  <input
                    type="radio"
                    value={key}
                    checked={playerAnswer === key}
                    onChange={(e) => setPlayerAnswer(e.target.value)}
                  />
                  {value}
                </label>
              </div>
            ))}
            <button type="submit">Submit Answer</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
