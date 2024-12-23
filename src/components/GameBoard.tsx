import React, { useState, useEffect } from 'react';
import { Card, GameState } from '../types/game';
import { getAIMove } from '../utils/aiPlayer';
import { PlayerCard } from './PlayerCard';
import { PlayerHand } from './PlayerHand';
import { Card as CardComponent } from './Card';
import { recycleCards } from '../utils/deckManager';

interface GameBoardProps {
  initialGameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ initialGameState }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // ... existing timer and AI effects ...

  const handleCardPlay = (card: Card) => {
    const topCard = gameState.pile[gameState.pile.length - 1];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    if (card.suit === topCard.suit || card.value === topCard.value) {
      const updatedPlayers = [...gameState.players];
      const playerIndex = gameState.currentPlayerIndex;
      
      updatedPlayers[playerIndex].hand = currentPlayer.hand.filter(
        c => !(c.suit === card.suit && c.value === card.value)
      );
      
      updatedPlayers[playerIndex].score += card.score;

      // Check if pile is getting too large and needs recycling
      const newPile = [...gameState.pile, card];
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
      }));
    }
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

  // ... rest of the component remains the same ...
};