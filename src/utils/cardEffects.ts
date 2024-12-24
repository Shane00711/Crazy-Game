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
      // 2 - Draw 2. Forces the next player to draw 2 cards from the deck and their turn is over. Can only be cancelled by playing another 2 forcing the next player to draw the sum of all 2s played.
      updates.pendingDraws = (gameState.pendingDraws || 0) + 2;
      break;
  }

  updates.currentPlayerIndex = getNextPlayerIndex(
    gameState.currentPlayerIndex,
    gameState.players.length,
    updates.isReversed ?? (gameState.isReversed || false),
    false
  );

  return updates;
};