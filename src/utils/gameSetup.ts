import { Player, GameConfig } from '../types/game';
import { createDeck } from './deck';

export const setupPlayers = (config: GameConfig): Player[] => {
  const players: Player[] = [];
  
  // Add human players
  for (let i = 0; i < config.humanPlayers; i++) {
    players.push({
      id: `human-${i + 1}`,
      name: `Player ${i + 1}`,
      isAI: false,
      score: 0,
      hand: [],
      penalties: 0
    });
  }
  
  // Add AI players
  for (let i = 0; i < config.aiPlayers; i++) {
    players.push({
      id: `ai-${i + 1}`,
      name: `AI ${i + 1}`,
      isAI: true,
      score: 0,
      hand: [],
      penalties: 0
    });
  }
  
  return players;
};

export const initializeGame = (config: GameConfig) => {
  const players = setupPlayers(config);
  const deck = createDeck();
  
  // Deal initial cards
  players.forEach(player => {
    player.hand = deck.splice(0, 7);
  });
  
  const firstCard = deck.splice(0, 1)[0];
  
  return {
    players,
    currentPlayerIndex: 0,
    deck,
    pile: [firstCard],
    timeLeft: config.turnTimeLimit,
    isGameOver: false,
    winner: null
  };
};