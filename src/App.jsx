import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Snake from './components/Snake';
import TicTacToe from './components/TicTacToe';
import Sudoku from './components/Sudoku';
import MemoryCard from './components/MemoryCard';
import WhackAMole from './components/WhackAMole';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Navigation */}
        <nav className="bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-white text-xl font-light tracking-wider">
                Gameries
              </Link>
              <div className="flex space-x-4">
                <Link to="/snake" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Snake
                </Link>
                <Link to="/tictactoe" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Tic Tac Toe
                </Link>
                <Link to="/sudoku" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sudoku
                </Link>
                <Link to="/memory" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Memory
                </Link>
                <Link to="/whackamole" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Whack-a-Mole
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/memory" element={<MemoryCard />} />
          <Route path="/whackamole" element={<WhackAMole />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
