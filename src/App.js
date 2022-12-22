import React, { useState } from 'react';
import './App.css';
import SelectLevel from './SelectLevel';
import Game from './Game';

const App = () => {
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setGameOver(false)
    setLevel(0)
    setScore(0)
  }

  const render = () => {
    if (level === 0) {
      return <SelectLevel setLevel={setLevel}/>
    }

    if (gameOver) {
      return (
        <div className="game-over">
          <div>GAME OVER, YOUR SCORED WAS {score}</div>
          <div className="play-again" onClick={resetGame}>Click here to play again</div>
        </div>
      )
    }

    return <Game speed={level} setGameOver={setGameOver} score={score} setScore={setScore}/>
  }

  return (
    <div className="app">
      {render()}
    </div>
  )
};

export default App;
