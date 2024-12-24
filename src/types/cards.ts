export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type SpecialCardValue = '2' | '7' | '8' | 'J';

export interface SpecialCardEffect {
  type: 'wild' | 'reverse' | 'skip' | 'draw2';
  requestedSuit?: Suit;
}

export const SPECIAL_CARDS: Record<SpecialCardValue, SpecialCardEffect> = {
  '8': { type: 'wild' },
  '7': { type: 'reverse' },
  'J': { type: 'skip' },
  '2': { type: 'draw2' },
};

// Function to get the effect of a special card
export function getSpecialCardEffect(card: string): SpecialCardEffect | null {
  return SPECIAL_CARDS[card as SpecialCardValue] || null;
}

export const CARD_SCORES: Record<CardValue, number> = {
  '2': 20,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 30,
  '8': 45,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': 11,
};

export interface Card {
  suit: Suit;
  value: CardValue;
  score: number;
}