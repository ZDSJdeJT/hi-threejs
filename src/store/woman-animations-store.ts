import { create } from 'zustand';

export const useWomanAnimationsStore = create<{
  animationIndex: number;
  setAnimationIndex: (animationIndex: number) => void;
  animations: string[];
  setAnimations: (animations: string[]) => void;
}>((set) => ({
  animationIndex: 0,
  setAnimationIndex: (animationIndex: number) =>
    set(() => ({ animationIndex })),
  animations: [],
  setAnimations: (animations: string[]) => set(() => ({ animations })),
}));
