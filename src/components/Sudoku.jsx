import React, { useState, useEffect } from 'react';

const Sudoku = () => {
  const initialBoard = Array(9).fill().map(() => Array(9).fill(0));
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [initialPuzzleState, setInitialPuzzleState] = useState(initialBoard);
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Add effect to handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Generate a valid Sudoku puzzle
  const generatePuzzle = () => {
    // This is a simple example puzzle - in a real app, you'd want a more sophisticated generator
    const puzzle = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ];
    setBoard(puzzle);
    setGameStatus('playing');
    setMistakes(0);
    setTime(0);
    setInitialPuzzleState(puzzle);
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  useEffect(() => {
    let timer;
    if (gameStatus === 'playing' && !isPaused) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus, isPaused]);

  // Add keyboard input support
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameStatus !== 'playing' || isPaused) return;
      
      const key = event.key;
      if (key >= '1' && key <= '9') {
        handleNumberInput(parseInt(key));
      } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        if (!selectedCell) {
          setSelectedCell({ row: 0, col: 0 });
          return;
        }

        let newRow = selectedCell.row;
        let newCol = selectedCell.col;

        switch (key) {
          case 'ArrowUp':
            newRow = (newRow - 1 + 9) % 9;
            break;
          case 'ArrowDown':
            newRow = (newRow + 1) % 9;
            break;
          case 'ArrowLeft':
            newCol = (newCol - 1 + 9) % 9;
            break;
          case 'ArrowRight':
            newCol = (newCol + 1) % 9;
            break;
        }

        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, gameStatus, isPaused]);

  const handleCellClick = (row, col) => {
    if (gameStatus !== 'playing') return;
    // Allow selection of any cell that's not in the initial puzzle
    if (initialPuzzleState[row][col] === 0) {
      setSelectedCell({ row, col });
      setIsEditing(true);
    }
  };

  const handleNumberInput = (num) => {
    if (!selectedCell || gameStatus !== 'playing') return;
    
    const { row, col } = selectedCell;
    
    // Create a new board array with the updated number
    const newBoard = board.map((r, rowIndex) => {
      if (rowIndex === row) {
        return r.map((cell, colIndex) => {
          if (colIndex === col) {
            return num;
          }
          return cell;
        });
      }
      return r;
    });
    
    // Allow editing of any cell that's not in the initial puzzle
    if (initialPuzzleState[row][col] === 0) {
      setBoard(newBoard);

      // Check if the puzzle is complete
      if (isPuzzleComplete(newBoard)) {
        setGameStatus('won');
      }
    }
  };

  const isPuzzleComplete = (currentBoard) => {
    // Check if all cells are filled
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] === 0) return false;
      }
    }
    return true;
  };

  const isEditableCell = (row, col) => {
    return initialPuzzleState[row][col] === 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-primary transition-all duration-300 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-secondary">
            Sudoku
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-secondary text-primary hover:bg-dark-teal transition-all duration-300 text-2xl"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="game-container animate-slide-up">
          <div className="grid grid-cols-9 gap-1">
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    w-12 h-12 text-xl font-bold rounded
                    game-cell
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                      ? 'selected'
                      : ''
                    }
                    ${initialPuzzleState[rowIndex][colIndex] !== 0 
                      ? 'text-secondary' 
                      : 'text-accent'
                    }
                    ${colIndex % 3 === 0 ? 'border-l-2 border-primary' : ''}
                    ${rowIndex % 3 === 0 ? 'border-t-2 border-primary' : ''}
                  `}
                >
                  {cell}
                </button>
              ))
            ))}
          </div>

          <div className="mt-6 grid grid-cols-9 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="game-button"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={generatePuzzle}
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
      </div>

      {gameStatus === 'won' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="game-container p-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Congratulations! You won! 🎉
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={generatePuzzle}
                className="game-button accent"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 1s step-end infinite;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-slide-in {
    animation: slideIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Sudoku; 