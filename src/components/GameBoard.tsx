import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { Card, getSpecialCardEffect, SPECIAL_CARDS, Suit } from '../types/cards';
import { getAIMove, getAISuitSelection } from '../utils/aiPlayer';
import { PlayerCard } from './PlayerCard';
import { PlayerHand } from './PlayerHand';
import { Card as CardComponent } from './Card';
import { recycleCards } from '../utils/deckManager';
import { applyCardEffect } from '../utils/cardEffects';
import SuitSelectionModal from '../models/suitSelectionModel';
import { useModal } from '../ModelContext';

interface GameBoardProps {
  initialGameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ initialGameState }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { openModal, closeModal, isOpen } = useModal();
  const [pendingCardEffect, setPendingCardEffect] = useState<Partial<GameState> | null>(null);
  useEffect(() => {
    if (gameState.isGameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          const updatedPlayers = [...prev.players];
          updatedPlayers[prev.currentPlayerIndex].penalties += 1;
          updatedPlayers[prev.currentPlayerIndex].score -= 5;

          return {
            ...prev,
            players: updatedPlayers,
            currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
            timeLeft: 30,
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameOver]);

  useEffect(() => {
    if (gameState.players[gameState.currentPlayerIndex].isAI && !gameState.isGameOver) {
      const aiTimeout = setTimeout(() => {
        const aiHand = gameState.players[gameState.currentPlayerIndex].hand;
        const topCard = gameState.pile[gameState.pile.length - 1];
        const requestedSuit = gameState.requestedSuit;
        const cardToPlay = getAIMove(aiHand, topCard, requestedSuit);
        
        if (cardToPlay) {
          handleCardPlay(cardToPlay);
        } else {
          drawCard();
        }
      }, 2000);

      return () => clearTimeout(aiTimeout);
    }
  }, [gameState.currentPlayerIndex]);
  // ... existing timer and AI effects ...

  const handleCardPlay = (card: Card) => {
    const topCard = gameState.pile[gameState.pile.length - 1];
    const requestedSuit = gameState.requestedSuit;
    const cardEffect = getSpecialCardEffect(card.value);
    if ((requestedSuit && card.suit === requestedSuit) || (cardEffect && cardEffect.type === 'wild')) {
      executeCardPlay(card);
    }
    if ((card.suit === topCard.suit || card.value === topCard.value) || (cardEffect && cardEffect.type === 'wild')) {
      executeCardPlay(card);
    }
  };

  const executeCardPlay = (card: Card) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
const updatedPlayers = [...gameState.players];
      const playerIndex = gameState.currentPlayerIndex;
      
      updatedPlayers[playerIndex].hand = currentPlayer.hand.filter(
        c => !(c.suit === card.suit && c.value === card.value)
      );
      
      updatedPlayers[playerIndex].score += card.score;

      // Apply card effect if it's a special card
      const cardEffect = getSpecialCardEffect(card.value);
      let effectUpdates = {};
      if (cardEffect) {
        if (cardEffect.type === 'wild') {
          if (currentPlayer.isAI) {
            const selectedSuit = getAISuitSelection(currentPlayer.hand);
            handleSuitSelection(selectedSuit);
            return;
          } else {
            openModal();
            setPendingCardEffect(applyCardEffect(gameState, cardEffect));
            return; // Wait for modal to close
          }
        }
        effectUpdates = applyCardEffect(gameState, cardEffect);
      }

      // Check if pile is getting too large and needs recycling
      let newPile = [...gameState.pile, card];
      let newDeck = gameState.deck;

      if (newPile.length > 20) { // Recycle when pile gets too large
        const recycled = recycleCards(newDeck, newPile);
        newDeck = recycled.newDeck;
        newPile = recycled.newPile;
      }

      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
        deck: newDeck,
        pile: newPile,
        timeLeft: 30,
        requestedSuit: undefined,
        ...effectUpdates,
      }));
  };

  const drawCard = () => {
    if (gameState.deck.length === 0) {
      // Recycle cards when deck is empty
      const recycled = recycleCards([], gameState.pile);
      
      const updatedPlayers = [...gameState.players];
      const playerIndex = gameState.currentPlayerIndex;
      const drawnCard = recycled.newDeck[0];
      
      updatedPlayers[playerIndex].hand.push(drawnCard);

      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        deck: recycled.newDeck.slice(1),
        pile: recycled.newPile,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
        timeLeft: 30,
      }));
    } else {
      const updatedPlayers = [...gameState.players];
      const playerIndex = gameState.currentPlayerIndex;
      const drawnCard = gameState.deck[0];
      
      updatedPlayers[playerIndex].hand.push(drawnCard);

      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        deck: prev.deck.slice(1),
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
        timeLeft: 30,
      }));
    }
  };

  const handleSuitSelection = (suit: Suit) => {
    setGameState(prev => ({
      ...prev,
      ...pendingCardEffect,
      requestedSuit: suit,
    }));
    setPendingCardEffect(null);
    closeModal();
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Card Game</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gameState.players.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              isActive={index === gameState.currentPlayerIndex}
              timeLeft={gameState.timeLeft}
            />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-center gap-8 items-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Deck</p>
              <div className="w-20 h-32 bg-blue-500 rounded-lg shadow-md"></div>
              <p className="mt-2 text-sm">{gameState.deck.length} cards left</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Current Card</p>
              {gameState.pile.length > 0 && (
                <CardComponent card={gameState.pile[gameState.pile.length - 1]} />
              )}
            </div>

            {gameState.requestedSuit && (gameState.pile[gameState.pile.length - 1].suit != gameState.requestedSuit)&& (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Requested Suit</p>
                <CardComponent card={{ suit: gameState.requestedSuit, value: 'A', score: 0 }} />
              </div>
            )}
          </div>
        </div>

        {!gameState.players[gameState.currentPlayerIndex].isAI && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {gameState.players[gameState.currentPlayerIndex].name}'s Hand
            </h2>
            <PlayerHand
              cards={gameState.players[gameState.currentPlayerIndex].hand}
              isActive={true}
              onCardPlay={handleCardPlay}
            />
            <button
              onClick={drawCard}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={gameState.isGameOver}
            >
              Draw Card
            </button>
          </div>
        )}
      </div>
      <SuitSelectionModal onSelectSuit={handleSuitSelection} />
    </div>
  );
};