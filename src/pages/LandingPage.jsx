import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const games = [
    {
      id: 'snake',
      name: 'Snake',
      description: 'Classic snake game - eat the food and grow longer!',
      path: '/snake'
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'The classic X and O game for two players',
      path: '/tictactoe'
    },
    {
      id: 'sudoku',
      name: 'Sudoku',
      description: 'Challenge yourself with this number puzzle game',
      path: '/sudoku'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Gameries</h1>
          <p className="text-xl text-gray-300">Your one-stop destination for classic mini-games</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2">{game.name}</h2>
              <p className="text-gray-400">{game.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 