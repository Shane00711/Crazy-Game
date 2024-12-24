import { Card } from '../types/cards';

export const getAIMove = (hand: Card[], topCard: Card | null): Card | null => {
  if (!topCard) return hand[0];
  
  return hand.find(card => 
    card.suit === topCard.suit || card.value === topCard.value
  ) || null;
};