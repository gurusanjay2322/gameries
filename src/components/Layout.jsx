import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-primary transition-all duration-300">
      <nav className="bg-secondary text-primary shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold hover:text-accent transition-colors">
              Gameries
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/sudoku" className="hover:text-accent transition-colors">
                Sudoku
              </Link>
              <Link to="/snake" className="hover:text-accent transition-colors">
                Snake
              </Link>
              <Link to="/tetris" className="hover:text-accent transition-colors">
                Tetris
              </Link>
              <Link to="/tictactoe" className="hover:text-accent transition-colors">
                Tic Tac Toe
              </Link>
              <Link to="/memory" className="hover:text-accent transition-colors">
                Memory
              </Link>
              <Link to="/whackamole" className="hover:text-accent transition-colors">
                Whack-a-Mole
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-accent transition-colors text-xl"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 