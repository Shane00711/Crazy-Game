import { GameState } from '../types/game';
import { SpecialCardEffect, Suit } from '../types/cards';
import { getNextPlayerIndex } from './gameRules';

export const applyCardEffect = (
  gameState: GameState,
  effect: SpecialCardEffect,
  requestedSuit?: Suit
): Partial<GameState> => {
  const updates: Partial<GameState> = {};

  switch (effect.type) {
    case 'wild':
      updates.requestedSuit = requestedSuit;
      break;
      
    case 'reverse':
      updates.isReversed = !gameState.isReversed;
      break;
      
    case 'skip':
      updates.currentPlayerIndex = getNextPlayerIndex(
        gameState.currentPlayerIndex,
        gameState.players.length,
        gameState.isReversed || false,
        true
      );
      return updates;
      
    case 'draw2':
      // Handled separately in drawCards logic
      break;
  }

  updates.currentPlayerIndex = getNextPlayerIndex(
    gameState.currentPlayerIndex,
    gameState.players.length,
    updates.isReversed ?? gameState.isReversed || false,
    false
  );

  return updates;
};