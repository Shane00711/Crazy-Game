export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface SpecialCardEffect {
  type: 'wild' | 'reverse' | 'skip' | 'draw2';
  requestedSuit?: Suit;
}

export const SPECIAL_CARDS = {
  '8': { type: 'wild' } as SpecialCardEffect,
  '7': { type: 'reverse' } as SpecialCardEffect,
  'J': { type: 'skip' } as SpecialCardEffect,
  '2': { type: 'draw2' } as SpecialCardEffect,
};

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