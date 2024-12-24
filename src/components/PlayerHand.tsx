import React from 'react';
import { Card as CardType } from '../types/cards';
import { Card } from './Card';

interface PlayerHandProps {
  cards: CardType[];
  isActive: boolean;
  onCardPlay?: (card: CardType) => void;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isActive, onCardPlay }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cards.map((card, index) => (
        <Card
          key={`${card.suit}-${card.value}`}
          card={card}
          onClick={isActive && onCardPlay ? () => onCardPlay(card) : undefined}
        />
      ))}
    </div>
  );
};