import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameSetup } from './components/GameSetup';
import { GameConfig, GameState } from './types/game';
import { initializeGame } from './utils/gameSetup';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleStartGame = (config: GameConfig) => {
    const initialGameState = initializeGame(config);
    setGameState(initialGameState);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {gameState ? (
        <GameBoard initialGameState={gameState} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Card Game Setup</h1>
          <GameSetup onStartGame={handleStartGame} />
        </div>
      )}
    </div>
  );
}

export default App;