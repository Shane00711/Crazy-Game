import React from 'react';
import { Timer, User, Bot } from 'lucide-react';
import { Player } from '../types/game';

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
  timeLeft: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, isActive, timeLeft }) => {
  return (
    <div className={`p-4 rounded-lg ${
      isActive ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
    }`}>
      <div className="flex items-center gap-2">
        {player.isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        <span className="font-semibold">{player.name}</span>
      </div>
      <div className="mt-2">
        <p>Score: {player.score}</p>
        <p>Cards: {player.hand.length}</p>
        <p>Penalties: {player.penalties}</p>
        {isActive && (
          <div className="flex items-center gap-2 text-red-500">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>
    </div>
  );
};