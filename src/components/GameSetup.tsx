import React, { useState } from 'react';
import { Plus, Minus, User, Bot } from 'lucide-react';
import { GameConfig } from '../types/game';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [humanPlayers, setHumanPlayers] = useState(1);
  const [aiPlayers, setAiPlayers] = useState(1);
  
  const handleStartGame = () => {
    onStartGame({
      humanPlayers,
      aiPlayers,
      turnTimeLimit: 30
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Game Setup</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Human Players</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setHumanPlayers(Math.max(1, humanPlayers - 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{humanPlayers}</span>
            <button 
              onClick={() => setHumanPlayers(Math.min(4, humanPlayers + 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span>AI Players</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setAiPlayers(Math.max(0, aiPlayers - 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{aiPlayers}</span>
            <button 
              onClick={() => setAiPlayers(Math.min(3, aiPlayers + 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleStartGame}
          disabled={humanPlayers + aiPlayers < 2 || humanPlayers + aiPlayers > 4}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Start Game
        </button>

        <p className="text-sm text-gray-500 text-center">
          Total players: {humanPlayers + aiPlayers} (2-4 players required)
        </p>
      </div>
    </div>
  );
};