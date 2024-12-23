import { Card, Suit } from './cards';

export interface Player {
  id: string;
  name: string;
  isAI: boolean;
  score: number;
  hand: Card[];
  penalties: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  pile: Card[];
  timeLeft: number;
  isGameOver: boolean;
  winner: Player | null;
  isReversed?: boolean;
  requestedSuit?: Suit;
  pendingDraws: number;
}

export interface GameConfig {
  humanPlayers: number;
  aiPlayers: number;
  turnTimeLimit: number;
}