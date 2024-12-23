import { Card } from '../types/game';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    VALUES.forEach((value, index) => {
      deck.push({
        suit,
        value,
        score: index + 2
      });
    });
  });
  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};