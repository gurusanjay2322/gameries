import React, { useState } from 'react';

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing');

  const handleClick = (i) => {
    if (gameStatus !== 'playing' || board[i]) return;

    const squares = [...board];
    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);

    const winner = calculateWinner(squares);
    if (winner) {
      setGameStatus('won');
    } else if (squares.every(square => square)) {
      setGameStatus('draw');
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (i) => {
    return (
      <button 
        className={`w-24 h-24 bg-gray-800 rounded-lg text-4xl font-light text-white 
          flex items-center justify-center transition-all duration-200
          hover:bg-gray-700 hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-not-allowed
          ${board[i] === 'X' ? 'text-green-400' : board[i] === 'O' ? 'text-red-500' : ''}`}
        onClick={() => handleClick(i)}
        disabled={gameStatus !== 'playing' || board[i]}
      >
        {board[i]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setGameStatus('playing');
  };

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `Winner: ${xIsNext ? 'O' : 'X'}`;
    } else if (gameStatus === 'draw') {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 tracking-wider">Tic Tac Toe</h1>
        <div className="text-xl text-gray-400">{getStatusMessage()}</div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <button 
        className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg 
          text-sm uppercase tracking-wider font-medium
          hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
        onClick={resetGame}
      >
        {gameStatus === 'playing' ? 'Reset Game' : 'Play Again'}
      </button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
