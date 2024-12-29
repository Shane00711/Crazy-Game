import { Card, getSpecialCardEffect, Suit } from '../types/cards';

export const getAIMove = (hand: Card[], topCard: Card | null, requestedSuit?: string | undefined): Card | null => {
  if (!topCard) return hand[0];
  if (requestedSuit) {
    return hand.find(card => card.suit === requestedSuit) || hand.find(card => getSpecialCardEffect(card.value)?.type === 'wild') || null;
  }

  return hand.find(card => 
    card.suit === topCard.suit || card.value === topCard.value
  ) || hand.find(card => getSpecialCardEffect(card.value)?.type === 'wild') || null;

};

export const getAISuitSelection = (hand: Card[]): Suit => {
  // AI logic to select a suit when playing a wild card
  const suitCounts: { [key in Suit]: number } = {
    hearts: 0,
    diamonds: 0,
    clubs: 0,
    spades: 0,
  };

  hand.forEach(card => {
    suitCounts[card.suit]++;
  });

  return Object.keys(suitCounts).reduce((a, b) => (suitCounts[a as Suit] > suitCounts[b as Suit] ? a : b)) as Suit;
};