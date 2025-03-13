import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Sudoku from './components/Sudoku';
import Snake from './components/Snake';
import Tetris from './components/Tetris';
import TicTacToe from './components/TicTacToe';
import MemoryCard from './components/MemoryCard';
import WhackAMole from './components/WhackAMole';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Layout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/memory" element={<MemoryCard />} />
          <Route path="/whackamole" element={<WhackAMole />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
