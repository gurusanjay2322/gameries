import React, { useState, useEffect } from 'react';

const MemoryCard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, complete
  const [isStarting, setIsStarting] = useState(false);
  const [time, setTime] = useState(0);
  const [showAllCards, setShowAllCards] = useState(false);

  const generateCards = () => {
    const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎟️', '🎠'];
    const cardPairs = [...emojis, ...emojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameStatus('idle');
    setTime(0);
  };

  const startGame = () => {
    setIsStarting(true);
    generateCards();
    setShowAllCards(true);
    
    // Show all cards for 5 seconds, then hide them and start the game
    setTimeout(() => {
      setShowAllCards(false);
      setGameStatus('playing');
      setIsStarting(false);
    }, 5000);
  };

  useEffect(() => {
    let timer;
    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

  const handleCardClick = (cardId) => {
    if (gameStatus !== 'playing' || isStarting) return;
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId) || matchedPairs.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      const firstEmoji = cards[firstCard].emoji;
      const secondEmoji = cards[secondCard].emoji;

      if (firstEmoji === secondEmoji) {
        setMatchedPairs(prev => [...prev, firstCard, secondCard]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs.length === cards.length && cards.length > 0) {
      setGameStatus('complete');
    }
  }, [matchedPairs, cards]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 tracking-wider">Memory Card</h1>
        <div className="text-xl text-gray-400">
          Time: {formatTime(time)} | Moves: {moves}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-24 h-24 cursor-pointer perspective-1000
              ${isStarting ? 'opacity-100' : 'opacity-100'} transition-opacity duration-500`}
            onClick={() => handleCardClick(card.id)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d
                ${showAllCards || flippedCards.includes(card.id) || matchedPairs.includes(card.id) ? '' : 'rotate-y-180'}`}
            >
              {/* Front of card */}
              <div className={`absolute w-full h-full backface-hidden rounded-lg shadow-lg
                flex items-center justify-center text-4xl
                ${matchedPairs.includes(card.id) ? 'bg-green-600' : 'bg-gray-700'}`}>
                {card.emoji}
              </div>
              {/* Back of card */}
              <div className="absolute w-full h-full backface-hidden bg-gray-600 rounded-lg shadow-lg
                flex items-center justify-center text-4xl rotate-y-180">
                ?
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameStatus === 'idle' ? (
        <button
          className="px-6 py-3 bg-gray-700 text-white rounded-lg
            hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
          onClick={startGame}
        >
          Start Game
        </button>
      ) : gameStatus === 'complete' ? (
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Congratulations!</h2>
          <p className="text-gray-400 mb-4">You completed the game in {moves} moves!</p>
          <button
            className="px-6 py-3 bg-gray-700 text-white rounded-lg
              hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <button
          className="px-6 py-3 bg-gray-700 text-white rounded-lg
            hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-200"
          onClick={startGame}
        >
          New Game
        </button>
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryCard; 