import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[0, 0]];
const INITIAL_DIRECTION = 'RIGHT';
const GAME_SPEED = 150;

const Snake = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE)
    ];
    setFood(newFood);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];

      switch (direction) {
        case 'UP':
          head[1] -= 1;
          break;
        case 'DOWN':
          head[1] += 1;
          break;
        case 'LEFT':
          head[0] -= 1;
          break;
        case 'RIGHT':
          head[0] += 1;
          break;
        default:
          break;
      }

      // Check for collisions with walls
      if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Check for collisions with self
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check if snake ate food
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10);
        generateFood();
        return newSnake;
      }

      return newSnake.slice(0, -1);
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
    }
  }, [gameOver, score, highScore]);

  const resetGame = () => {
    setSnake([[0, 0]]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold text-secondary">Snake</h1>
        <div className="text-2xl font-bold text-accent">Score: {score} | High Score: {highScore}</div>
      </div>

      <div className="game-container p-6 animate-slide-up">
        <div className="grid grid-cols-20 gap-1 w-fit mx-auto">
          {Array(GRID_SIZE).fill().map((_, row) =>
            Array(GRID_SIZE).fill().map((_, col) => {
              const isSnake = snake.some(segment => segment[0] === col && segment[1] === row);
              const isFood = food[0] === col && food[1] === row;
              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    w-4 h-4 rounded
                    ${isSnake ? 'bg-secondary' : ''}
                    ${isFood ? 'bg-accent' : ''}
                    ${!isSnake && !isFood ? 'bg-primary border border-secondary' : ''}
                  `}
                />
              );
            })
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="game-button accent"
          >
            New Game
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="game-button"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="game-container p-8 text-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Game Over! Score: {score}
            </h2>
            <button
              onClick={resetGame}
              className="game-button accent"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snake; 