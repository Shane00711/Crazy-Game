import { SPECIAL_CARDS, Suit, Card } from '../types/cards';

export const isValidFirstCard = (card: Card): boolean => {
  return !['8', '2', '7', 'J'].includes(card.value);
};

export const isValidPlay = (
  card: Card,
  topCard: Card,
  requestedSuit?: Suit
): boolean => {
  // Wild card (8) can be played on anything except 2
  if (card.value === '8' && topCard.value !== '2') {
    return true;
  }

  // If there's a requested suit from a previous 8, must match it
  if (requestedSuit) {
    return card.suit === requestedSuit;
  }

  // Draw 2 can only be countered by another Draw 2
  if (topCard.value === '2') {
    return card.value === '2';
  }

  // Otherwise, match suit or value
  return card.suit === topCard.suit || card.value === topCard.value;
};

export const calculatePendingDraws = (pile: Card[]): number => {
  let draws = 0;
  for (let i = pile.length - 1; i >= 0; i--) {
    if (pile[i].value === '2') {
      draws += 2;
    } else {
      break;
    }
  }
  return draws;
};

export const getNextPlayerIndex = (
  currentIndex: number,
  totalPlayers: number,
  isReversed: boolean,
  skipNext: boolean
): number => {
  const direction = isReversed ? -1 : 1;
  const nextIndex = (currentIndex + direction + totalPlayers) % totalPlayers;
  return skipNext ? 
    (nextIndex + direction + totalPlayers) % totalPlayers : 
    nextIndex;
};

export const calculateFinalScore = (hand: Card[]): number => {
  return hand.reduce((total, card) => total + card.score, 0);
};