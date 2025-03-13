import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const games = [
    {
      title: 'Sudoku',
      description: 'Classic number puzzle game',
      path: '/sudoku',
      icon: '🔢'
    },
    {
      title: 'Snake',
      description: 'Classic snake game',
      path: '/snake',
      icon: '🐍'
    },
    {
      title: 'Tetris',
      description: 'Classic block stacking game',
      path: '/tetris',
      icon: '🎮'
    },
    {
      title: 'Tic Tac Toe',
      description: 'Classic two-player game',
      path: '/tictactoe',
      icon: '⭕'
    },
    {
      title: 'Memory Card',
      description: 'Test your memory with card matching',
      path: '/memory',
      icon: '🎴'
    },
    {
      title: 'Whack-a-Mole',
      description: 'Fun arcade-style game',
      path: '/whackamole',
      icon: '🔨'
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-secondary mb-8 text-center animate-slide-up">
        Welcome to Gameries
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.path}
            to={game.path}
            className="game-container p-6 text-center hover:shadow-lg transition-all duration-300 animate-slide-up"
          >
            <div className="text-4xl mb-4">{game.icon}</div>
            <h2 className="text-2xl font-bold text-secondary mb-2">{game.title}</h2>
            <p className="text-primary">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 