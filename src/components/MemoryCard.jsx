import React, { useState, useEffect } from 'react';

const MemoryCard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎟️', '🎠'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...emojis, ...emojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || cards[cardId].isMatched) return;

    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (flippedCardIds) => {
    const [first, second] = flippedCardIds;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard.emoji === secondCard.emoji) {
      const newCards = cards.map(card =>
        card.id === first || card.id === second
          ? { ...card, isMatched: true }
          : card
      );
      setCards(newCards);
      setFlippedCards([]);
      setMatchedPairs([...matchedPairs, firstCard.emoji]);

      if (matchedPairs.length + 1 === emojis.length) {
        setGameWon(true);
      }
    } else {
      setTimeout(() => {
        const newCards = cards.map(card =>
          card.id === first || card.id === second
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-secondary mb-8">Memory Card Game</h1>
      <div className="text-xl font-semibold text-primary">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-24 h-24 rounded-lg text-4xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
              card.isFlipped || card.isMatched
                ? 'bg-accent text-primary'
                : 'bg-secondary text-primary'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </button>
        ))}
      </div>
      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-primary p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Congratulations!</h2>
            <p className="text-xl text-primary mb-4">You won in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-secondary transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-secondary transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

export default MemoryCard; 