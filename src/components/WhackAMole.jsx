import React, { useState, useEffect } from 'react';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHole, setActiveHole] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
  };

  useEffect(() => {
    let timer;
    let moleTimer;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      moleTimer = setInterval(() => {
        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);
        setTimeout(() => {
          setActiveHole(null);
        }, 1000);
      }, 1500);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
    }

    return () => {
      clearInterval(timer);
      clearInterval(moleTimer);
    };
  }, [isPlaying, timeLeft]);

  const whackMole = (holeIndex) => {
    if (holeIndex === activeHole) {
      setScore(prev => prev + 1);
      setActiveHole(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-secondary mb-8">Whack-a-Mole</h1>
      <div className="flex justify-between w-full max-w-md text-xl font-semibold text-primary">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array(9).fill(null).map((_, index) => (
          <button
            key={index}
            onClick={() => whackMole(index)}
            className={`w-24 h-24 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              activeHole === index
                ? 'bg-accent text-primary'
                : 'bg-secondary text-primary'
            }`}
          >
            {activeHole === index ? '🐹' : '🕳️'}
          </button>
        ))}
      </div>
      {gameOver ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-primary p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Game Over!</h2>
            <p className="text-xl text-primary mb-4">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-secondary transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      ) : !isPlaying ? (
        <button
          onClick={startGame}
          className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-secondary transition-colors"
        >
          Start Game
        </button>
      ) : null}
    </div>
  );
};

export default WhackAMole; 