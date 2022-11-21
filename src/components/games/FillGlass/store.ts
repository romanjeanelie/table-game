import create from "zustand";
import produce from "immer";

interface Game {
  isReady: boolean;
  isStarted: boolean;
  isPaused: boolean;
  isEnded: boolean;
}

interface StoreState {
  // State
  game: Game;
  currentInstruction: string;
  targetWeight: number;

  // Mutations
  setGameReady: () => void;
  resetGame: () => void;
  setCurrentInstruction: (instruction: string) => void;
  setTargetWeight: (weight: number) => void;
}

export const instructions = ["poseVerre", "rempliVerre"];

export const useStoreGlasses = create<StoreState>((set, get) => ({
  game: {
    isReady: false,
    isStarted: false,
    isPaused: false,
    isEnded: false,
  },
  currentInstruction: instructions[0],
  targetWeight: 0,

  // Mutations
  setGameReady: () =>
    set(
      produce((draft) => {
        draft.game.isReady = true;
      })
    ),
  setGameStarted: () =>
    set(
      produce((draft) => {
        draft.game.isStarted = true;
      })
    ),
  resetGame: () =>
    set(
      produce((draft) => {
        draft.game.isStarted = false;
        draft.game.isReady = false;
      })
    ),
  setCurrentInstruction: (instruction) =>
    set(
      produce((draft) => {
        draft.currentInstruction = instruction;
      })
    ),
  setTargetWeight: (weight) =>
    set(
      produce((draft) => {
        draft.targetWeight = weight;
      })
    ),
}));
