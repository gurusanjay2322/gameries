import React, { useState, useEffect, useCallback } from 'react';

const Tetris = () => {
  const [board, setBoard] = useState(Array(20).fill().map(() => Array(10).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const pieces = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]]  // Z
  ];

  const generatePiece = useCallback(() => {
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    setCurrentPiece(piece);
    setPosition({ x: Math.floor((10 - piece[0].length) / 2), y: 0 });
  }, []);

  const moveDown = useCallback(() => {
    if (gameOver || isPaused) return;

    setPosition(prev => {
      const newPos = { ...prev, y: prev.y + 1 };
      if (isCollision(newPos)) {
        mergePiece();
        clearLines();
        generatePiece();
        if (isCollision({ x: newPos.x, y: 0 })) {
          setGameOver(true);
        }
        return prev;
      }
      return newPos;
    });
  }, [currentPiece, position, board, gameOver, isPaused, generatePiece]);

  const moveLeft = () => {
    if (gameOver || isPaused) return;
    setPosition(prev => {
      const newPos = { ...prev, x: prev.x - 1 };
      return isCollision(newPos) ? prev : newPos;
    });
  };

  const moveRight = () => {
    if (gameOver || isPaused) return;
    setPosition(prev => {
      const newPos = { ...prev, x: prev.x + 1 };
      return isCollision(newPos) ? prev : newPos;
    });
  };

  const rotate = () => {
    if (gameOver || isPaused) return;
    setCurrentPiece(prev => {
      const newPiece = prev[0].map((_, i) => prev.map(row => row[i]).reverse());
      const newPos = { ...position };
      if (isCollision({ ...newPos, piece: newPiece })) {
        return prev;
      }
      return newPiece;
    });
  };

  const isCollision = (pos = position, piece = currentPiece) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const boardX = pos.x + x;
          const boardY = pos.y + y;
          if (
            boardX < 0 ||
            boardX >= 10 ||
            boardY >= 20 ||
            (boardY >= 0 && board[boardY][boardX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    if (!currentPiece) return;
    setBoard(prev => {
      const newBoard = prev.map(row => [...row]);
      currentPiece.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0) {
              newBoard[boardY][boardX] = 1;
            }
          }
        });
      });
      return newBoard;
    });
  };

  const clearLines = () => {
    setBoard(prev => {
      const newBoard = prev.filter(row => row.some(cell => !cell));
      const clearedLines = 20 - newBoard.length;
      if (clearedLines > 0) {
        setScore(prev => prev + clearedLines * 100);
      }
      return [
        ...Array(clearedLines).fill().map(() => Array(10).fill(0)),
        ...newBoard
      ];
    });
  };

  useEffect(() => {
    generatePiece();
  }, [generatePiece]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
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
  }, [moveLeft, moveRight, moveDown, rotate]);

  useEffect(() => {
    const gameLoop = setInterval(moveDown, 1000);
    return () => clearInterval(gameLoop);
  }, [moveDown]);

  const resetGame = () => {
    setBoard(Array(20).fill().map(() => Array(10).fill(0)));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generatePiece();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold text-secondary">Tetris</h1>
        <div className="text-2xl font-bold text-accent">Score: {score}</div>
      </div>

      <div className="game-container p-6 animate-slide-up">
        <div className="grid grid-cols-10 gap-1 w-fit mx-auto">
          {board.map((row, y) =>
            row.map((cell, x) => {
              const isCurrentPiece = currentPiece && 
                y >= position.y && 
                y < position.y + currentPiece.length &&
                x >= position.x && 
                x < position.x + currentPiece[0].length &&
                currentPiece[y - position.y][x - position.x];

              return (
                <div
                  key={`${y}-${x}`}
                  className={`
                    w-6 h-6 rounded
                    ${cell || isCurrentPiece ? 'bg-secondary' : ''}
                    ${!cell && !isCurrentPiece ? 'bg-primary border border-secondary' : ''}
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

export default Tetris; 