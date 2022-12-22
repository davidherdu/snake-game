import React, { useState, useEffect } from 'react';

const Game = ({speed, setGameOver, score, setScore}) => {
  const [snake, setSnake] = useState([[0,0]]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState([10, 10]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    document.addEventListener('keydown', changeDirection);
    return () => document.removeEventListener('keydown', changeDirection);
  }, [direction]);

  const moveSnake = () => {
    const snakeCopy = [...snake];
    const head = snakeCopy[snakeCopy.length - 1];

    // Move the snake in the current direction
    let newHead;
    if (direction === 'RIGHT') {
      newHead = [head[0] + 1, head[1]];
    } else if (direction === 'LEFT') {
      newHead = [head[0] - 1, head[1]];
    } else if (direction === 'UP') {
      newHead = [head[0], head[1] - 1];
    } else if (direction === 'DOWN') {
      newHead = [head[0], head[1] + 1];
    }

    // Check for collision with the wall or itself
    if (checkCollision(newHead)) {
      // Game over
      setGameOver(true);
    }

    // Check for collision with the food
    if (checkFoodCollision(newHead)) {
      // Snake ate the food, don't remove the tail
      snakeCopy.push(newHead);
    } else {
      // Snake didn't eat the food, remove the tail
      snakeCopy.push(newHead);
      snakeCopy.shift();
    }

    setSnake(snakeCopy);
  };

  const changeDirection = (event) => {
    event.preventDefault();
    if (event.keyCode === 37 && direction !== 'RIGHT') {
      setDirection('LEFT');
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
      setDirection('UP');
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
      setDirection('RIGHT');
    } else if (event.keyCode === 40 && direction !== 'UP') {
      setDirection('DOWN');
    }
  };

  const checkCollision = (newHead) => {
    if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
      // Collision with the wall
      return true;
    }
    for (const segment of snake) {
      if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
        // Collision with itself
        return true;
      }
    }
    return false;
  };

  const generateFood = () => {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    while (snake.some((segment) => segment[0] === x && segment[1] === y)) {
      // Generate a new position if the food collides with the snake
      x = Math.floor(Math.random() * 20);
      y = Math.floor(Math.random() * 20);
    }
    setFood([x, y]);
  };

  const checkFoodCollision = (newHead) => {
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      // Eat the food and generate a new one
      generateFood();
      updateScore();
      return true;
    }
    return false;
  };

  const updateScore = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <h1>Snake</h1>
      <div className="game-board">
        {snake.map(([x, y], index) => (
          <div
            key={index}
            className="snake-segment"
            style={{ top: `${y * 20}px`, left: `${x * 20}px` }}
          />
        ))}
        <div
          className="food"
          style={{ top: `${food[1] * 20}px`, left: `${food[0] * 20}px` }}
        />
      </div>
      <h2>Score: {score}</h2>
      <h2>Level: {10 - (speed / 100) + 1}</h2>
    </div>
  );
};

export default Game;
