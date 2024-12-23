import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  
  return (
    <div 
      onClick={onClick}
      className={`w-20 h-32 rounded-lg border-2 border-gray-300 bg-white shadow-md 
        flex flex-col items-center justify-between p-2 cursor-pointer hover:shadow-lg
        transform hover:-translate-y-1 transition-all ${onClick ? 'hover:border-blue-500' : ''}`}
    >
      <span className={`text-lg font-bold ${isRed ? 'text-red-500' : 'text-black'}`}>
        {card.value}
      </span>
      <span className={`text-2xl ${isRed ? 'text-red-500' : 'text-black'}`}>
        {card.suit === 'hearts' ? '♥' : 
         card.suit === 'diamonds' ? '♦' : 
         card.suit === 'clubs' ? '♣' : '♠'}
      </span>
    </div>
  );
};