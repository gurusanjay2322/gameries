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

  const handleCellClick = (row, col) => {
    if (gameStatus !== 'playing') return;
    if (initialPuzzleState[row][col] !== 0) return; // Don't allow editing initial numbers
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num) => {
    if (!selectedCell || gameStatus !== 'playing') return;
    
    const { row, col } = selectedCell;
    const newBoard = [...board];
    
    // Check if the cell is part of the initial puzzle
    if (isInitialCell(row, col)) return;

    newBoard[row][col] = num;
    setBoard(newBoard);

    // Check if the puzzle is complete
    if (isPuzzleComplete(newBoard)) {
      setGameStatus('won');
    }
  };

  const isInitialCell = (row, col) => {
    // In a real app, you'd want to track which cells are part of the initial puzzle
    return board[row][col] !== 0;
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 tracking-wider">Sudoku</h1>
        <div className="text-xl text-gray-400">
          Time: {formatTime(time)} | Mistakes: {mistakes}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
        <div className="grid grid-cols-9 gap-0.5">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 bg-gray-700 text-white text-xl font-light
                  flex items-center justify-center transition-all duration-200
                  ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-600' : ''}
                  ${isInitialCell(rowIndex, colIndex) ? 'bg-gray-600' : 'hover:bg-gray-600'}
                  ${(rowIndex + 1) % 3 === 0 ? 'border-b-2 border-gray-600' : ''}
                  ${(colIndex + 1) % 3 === 0 ? 'border-r-2 border-gray-600' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={isInitialCell(rowIndex, colIndex)}
              >
                {cell !== 0 && cell}
              </button>
            ))
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-9 gap-2">
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <button
            key={num}
            className="w-12 h-12 bg-gray-700 text-white text-xl font-light rounded-lg
              flex items-center justify-center transition-all duration-200
              hover:bg-gray-600 hover:-translate-y-0.5"
            onClick={() => handleNumberInput(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          className="px-6 py-3 bg-gray-700 text-white rounded-lg 
            text-sm uppercase tracking-wider font-medium
            hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button 
          className="px-6 py-3 bg-gray-700 text-white rounded-lg 
            text-sm uppercase tracking-wider font-medium
            hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
          onClick={generatePuzzle}
        >
          New Game
        </button>
      </div>

      {gameStatus === 'won' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl text-white mb-4">Congratulations!</h2>
            <p className="text-gray-400 mb-4">You completed the puzzle!</p>
            <button
              className="px-6 py-3 bg-gray-700 text-white rounded-lg 
                text-sm uppercase tracking-wider font-medium
                hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
              onClick={generatePuzzle}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sudoku; 