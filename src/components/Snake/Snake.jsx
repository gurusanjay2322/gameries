import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

function getRandomPosition(numCells) {
  const x = Math.floor(Math.random() * numCells);
  const y = Math.floor(Math.random() * numCells);
  return [x, y];
}

function SnakeGame() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState(getRandomPosition(15));
  const [direction, setDirection] = useState('right');
  const [status, setStatus] = useState('not-started');
  const [score, setScore] = useState(0);
  const gridSize = 15;
  const cellSize = 30;
  const gameSpeed = 150;
  const moveFoodTimeoutRef = useRef(null);
  const moveSnakeIntervalRef = useRef(null);

  const numCells = gridSize;

  const startGame = () => {
    setSnake([[5, 5]]);
    setFood(getRandomPosition(numCells));
    setDirection('right');
    setScore(0);
    setStatus('playing');
  };

  const moveFood = () => {
    const newFood = getRandomPosition(numCells);
    setFood(newFood);
  };

  const checkCollision = (head) => {
    // Check wall collision
    if (head[0] < 0 || head[0] >= numCells || head[1] < 0 || head[1] >= numCells) {
      return true;
    }
    // Check self collision
    return snake.some(segment => segment[0] === head[0] && segment[1] === head[1]);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    let head = [...newSnake[0]];

    switch (direction) {
      case 'up':
        head[1] -= 1;
        break;
      case 'down':
        head[1] += 1;
        break;
      case 'left':
        head[0] -= 1;
        break;
      case 'right':
        head[0] += 1;
        break;
      default:
        break;
    }

    if (checkCollision(head)) {
      setStatus('game-over');
      return;
    }

    newSnake.unshift(head);

    // Check if snake ate food
    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(prev => prev + 10);
      moveFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status === 'playing') {
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'down') setDirection('up');
            break;
          case 'ArrowDown':
            if (direction !== 'up') setDirection('down');
            break;
          case 'ArrowLeft':
            if (direction !== 'right') setDirection('left');
            break;
          case 'ArrowRight':
            if (direction !== 'left') setDirection('right');
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, status]);

  useEffect(() => {
    if (status === 'playing') {
      moveSnakeIntervalRef.current = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(moveSnakeIntervalRef.current);
    }
  }, [status, snake, direction]);

  const cells = [];
  for (let y = 0; y < numCells; y++) {
    for (let x = 0; x < numCells; x++) {
      const isFoodCell = food[0] === x && food[1] === y;
      const isSnakeCell = snake.some((segment) => segment[0] === x && segment[1] === y);
      const key = `${x}-${y}`;
      cells.push(
        <div
          key={key}
          className={`cell ${isFoodCell ? 'food' : ''} ${isSnakeCell ? 'snake' : ''}`}
          style={{
            width: cellSize,
            height: cellSize,
          }}
        ></div>
      );
    }
  }

  return (
    <div className="snake-game-container">
      <div className="game-header">
        <h1>Snake Game</h1>
        <div className="score">Score: {score}</div>
      </div>
      <div className="game-container" style={{ width: gridSize * cellSize }}>
        <div className={`game-board ${status}`}>
          {cells}
          {status === 'game-over' && (
            <div className="game-over-message">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <button onClick={startGame}>Play Again</button>
            </div>
          )}
        </div>
        {status === 'not-started' && (
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        )}
      </div>
      <div className="game-instructions">
        <p>Use arrow keys to control the snake</p>
        <p>Eat the food to grow and increase your score</p>
        <p>Avoid hitting the walls or yourself</p>
      </div>
    </div>
  );
}

export default SnakeGame;
