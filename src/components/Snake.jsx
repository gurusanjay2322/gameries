import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const Snake = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle');
  const [highScore, setHighScore] = useState(0);

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus === 'idle') {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || 
            e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          setGameStatus('playing');
        }
        return;
      }

      if (gameStatus !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStatus]);

  // Game loop
  useEffect(() => {
    let gameLoop;
    if (gameStatus === 'playing') {
      gameLoop = setInterval(() => {
        setSnake(prevSnake => {
          const head = prevSnake[0];
          const newHead = {
            x: head.x + direction.x,
            y: head.y + direction.y
          };

          // Check for collisions with walls
          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
          ) {
            setGameStatus('gameover');
            return prevSnake;
          }

          // Check for collisions with self
          if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            setGameStatus('gameover');
            return prevSnake;
          }

          // Check for food collision
          if (newHead.x === food.x && newHead.y === food.y) {
            setScore(prev => prev + 1);
            generateFood();
            return [newHead, ...prevSnake];
          }

          return [newHead, ...prevSnake.slice(0, -1)];
        });
      }, GAME_SPEED);
    }
    return () => clearInterval(gameLoop);
  }, [direction, food, gameStatus, generateFood]);

  // Update high score
  useEffect(() => {
    if (gameStatus === 'gameover' && score > highScore) {
      setHighScore(score);
    }
  }, [gameStatus, score, highScore]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameStatus('idle');
    generateFood();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 tracking-wider">Snake</h1>
        <div className="text-xl text-gray-400">
          Score: {score} | High Score: {highScore}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
        <div 
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: '400px',
            height: '400px'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`w-full h-full rounded-sm transition-colors duration-100
                  ${isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-gray-700'}`}
              />
            );
          })}
        </div>
      </div>

      {gameStatus === 'gameover' ? (
        <div className="mt-8 text-center">
          <h2 className="text-2xl text-white mb-4">Game Over!</h2>
          <p className="text-gray-400 mb-4">Final Score: {score}</p>
          <button
            className="px-6 py-3 bg-gray-700 text-white rounded-lg 
              text-sm uppercase tracking-wider font-medium
              hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            {gameStatus === 'idle' 
              ? 'Press any arrow key to start'
              : 'Use arrow keys to control the snake'}
          </p>
          <button 
            className="px-6 py-3 bg-gray-700 text-white rounded-lg 
              text-sm uppercase tracking-wider font-medium
              hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
            onClick={startGame}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Snake; 