import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic snake game with modern controls',
    icon: '🐍',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'The classic X and O game',
    icon: '⭕',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Number puzzle game',
    icon: '🔢',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'memory',
    title: 'Memory Card',
    description: 'Test your memory with card matching',
    icon: '🎴',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'whackamole',
    title: 'Whack-a-Mole',
    description: 'Quick reflexes required!',
    icon: '🐹',
    color: 'from-yellow-500 to-yellow-600'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-white text-center mb-4 tracking-wider">
            Welcome to Gameries
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            A collection of classic and modern mini-games to keep you entertained.
            Choose a game below to start playing!
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/${game.id}`}
              className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-xl
                transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 
                group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative p-6">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h2 className="text-2xl font-light text-white mb-2">{game.title}</h2>
                <p className="text-gray-400">{game.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t 
                from-gray-900 to-transparent">
                <span className="text-white text-sm uppercase tracking-wider">
                  Play Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            Built with React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 