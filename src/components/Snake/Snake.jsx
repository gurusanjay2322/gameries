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
      const [status, setStatus] = useState('not-started'); // Initial status is 'not-started'
      const [score, setScore] = useState(0);
      const gridSize = 15;
      const cellSize = 30;
      const gameSpeed = 200;
      const moveFoodTimeoutRef = useRef(null);
      const moveSnakeIntervalRef = useRef(null);

      const numCells = gridSize;
      const startGame = ()=>{
        setStatus('playing')
      }
      const moveFood = () => {
        setFood(getRandomPosition(numCells));
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
    
        // Rest of your moveSnake logic...
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
      }, [status]);

      useEffect(() => {
        if (status === 'playing') {
          moveFoodTimeoutRef.current = setTimeout(moveFood, 5000);
          return () => clearTimeout(moveFoodTimeoutRef.current);
        }
      }, [status]);

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
        <div className="App">
          <h1>Snake Game</h1>
          <div className="game-container" style={{ width: gridSize * cellSize }}>
            <div className={`game-board ${status}`}>
              {cells}
              {status === 'game-over' && (
                <div className="game-over-message">
                  <p>Game Over!</p>
                  <p>Your Score: {score}</p>
                  <button onClick={startGame}>Play Again</button>
                </div>
              )}
            </div>
            <button onClick={startGame}>Start Game</button>
          </div>
        </div>
      );
              }
  export default SnakeGame
