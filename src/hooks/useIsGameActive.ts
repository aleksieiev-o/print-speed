import {useMemo} from 'react';
import {useGameStore} from '@/store/hooks';

export const useIsGameActive = () => {
  const gameStore = useGameStore();

  const isGameActive = useMemo(() => {
    return gameStore.isGameRunning || gameStore.isGamePaused;
  }, [gameStore.isGamePaused, gameStore.isGameRunning]);

  return {isGameActive};
};
