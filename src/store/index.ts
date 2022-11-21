import create from "zustand";
import produce from "immer";

// Config
import { introSteps } from "@/config";

interface Position {
  x: number;
  y: number;
}

interface Player {
  key: number;
  score: number;
  isRegistered: boolean;
  position: Position;
}

interface Game {
  introStep: string;
  isReady: boolean;
  isStarted: boolean;
  isPaused: boolean;
  isEnded: boolean;
}

interface StoreState {
  // State
  players: Player[];
  game: Game;
  // Mutations
  addPlayer: (playerKey: number) => void;
  removePlayer: (playerKey: number) => void;
  editScorePlayer: (playerKey: number, newScore: number) => void;
  setGameReady: () => void;
  resetGame: () => void;
  setIntroStep: (step) => void;
  // Getters
  getPlayer: (playerKey) => Player;
  getRegisteredPlayers: () => Player[];
}

export const useStore = create<StoreState>((set, get) => ({
  // State
  players: [
    { key: 1, score: 0, isRegistered: false, position: { x: 35, y: 12 } },
    { key: 2, score: 0, isRegistered: false, position: { x: 65, y: 12 } },
    { key: 3, score: 0, isRegistered: false, position: { x: 90, y: 45 } },
    { key: 4, score: 0, isRegistered: false, position: { x: 65, y: 88 } },
    { key: 5, score: 0, isRegistered: false, position: { x: 35, y: 88 } },
    { key: 6, score: 0, isRegistered: false, position: { x: 10, y: 45 } },
  ],
  game: {
    introStep: introSteps.selectGame.label,
    isReady: false,
    isStarted: false,
    isPaused: false,
    isEnded: false,
  },

  // Mutations
  addPlayer: (playerKey) =>
    set(
      produce((draft) => {
        const player = draft.players.find((el) => el.key === playerKey);
        player.isRegistered = true;
      })
    ),
  removePlayer: (playerKey) =>
    set(
      produce((draft) => {
        const player = draft.players.find((el) => el.key === playerKey);
        player.isRegistered = false;
      })
    ),
  editScorePlayer: (playerKey, newScore) =>
    set(
      produce((draft) => {
        const player = draft.players.find((el) => el.key === playerKey);
        player.score = newScore;
      })
    ),
  setGameReady: () =>
    set(
      produce((draft) => {
        draft.game.isReady = true;
      })
    ),
  resetGame: () =>
    set(
      produce((draft) => {
        draft.game.isReady = false;
      })
    ),
  setIntroStep: (step) =>
    set(
      produce((draft) => {
        draft.game.introStep = step;
      })
    ),

  // Getters
  getPlayer: (playerKey) => {
    const player = get().players.find((el) => el.key === playerKey);
    return player;
  },
  getRegisteredPlayers: () => {
    return get().players.filter((el) => el.isRegistered);
  },
}));
