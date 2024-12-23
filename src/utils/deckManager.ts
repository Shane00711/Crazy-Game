import { Card } from '../types/game';
import { shuffleDeck } from './deck';

export const recycleCards = (deck: Card[], pile: Card[]): { newDeck: Card[], newPile: Card[] } => {
  // Keep the top card of the pile
  const topCard = pile[pile.length - 1];
  
  // Take all other cards from the pile
  const cardsToRecycle = pile.slice(0, -1);
  
  // Create new deck with recycled cards
  const newDeck = shuffleDeck([...deck, ...cardsToRecycle]);
  
  return {
    newDeck,
    newPile: [topCard]
  };
};