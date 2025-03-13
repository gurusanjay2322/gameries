import React, { useState, useEffect } from 'react';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState('playing');
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    let timer;
    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStatus('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

  useEffect(() => {
    let moleTimer;
    if (gameStatus === 'playing') {
      moleTimer = setInterval(() => {
        setMoles(prev => {
          const newMoles = [...prev];
          // Randomly show/hide moles
          newMoles.forEach((_, index) => {
            if (Math.random() < 0.3) { // 30% chance to show a mole
              newMoles[index] = true;
            } else {
              newMoles[index] = false;
            }
          });
          return newMoles;
        });
      }, 1000);
    }
    return () => clearInterval(moleTimer);
  }, [gameStatus]);

  const handleWhack = (index) => {
    if (moles[index]) {
      setScore(prev => prev + 1);
      setMoles(prev => {
        const newMoles = [...prev];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStatus('playing');
    setMoles(Array(9).fill(false));
  };

  useEffect(() => {
    if (gameStatus === 'ended' && score > highScore) {
      setHighScore(score);
    }
  }, [gameStatus, score, highScore]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 tracking-wider">Whack-a-Mole</h1>
        <div className="text-xl text-gray-400">
          Time: {timeLeft}s | Score: {score} | High Score: {highScore}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        {moles.map((isUp, index) => (
          <button
            key={index}
            className={`w-32 h-32 rounded-lg bg-gray-800 relative overflow-hidden
              transition-all duration-200 hover:bg-gray-700`}
            onClick={() => handleWhack(index)}
            disabled={gameStatus !== 'playing'}
          >
            <div
              className={`absolute inset-0 bg-gray-700 rounded-lg transition-transform duration-200
                ${isUp ? 'translate-y-0' : 'translate-y-full'}`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                🐹
              </div>
            </div>
          </button>
        ))}
      </div>

      {gameStatus === 'ended' ? (
        <div className="mt-8 text-center">
          <h2 className="text-2xl text-white mb-4">Game Over!</h2>
          <p className="text-gray-400 mb-4">Final Score: {score}</p>
          <button
            className="px-6 py-3 bg-gray-700 text-white rounded-lg 
              text-sm uppercase tracking-wider font-medium
              hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <button 
          className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg 
            text-sm uppercase tracking-wider font-medium
            hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
          onClick={startGame}
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default WhackAMole; 