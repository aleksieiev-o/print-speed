import { useContext } from 'react';
import { RootStore } from './index';
import { StoreContext } from '@/providers/StoreContext.provider';
import {GameStore} from '@/store/GameStore';

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within StoreContextProvider');
  }
  return context;
};

export const useGameStore = (): GameStore => {
  const { gameStore } = useRootStore();
  return gameStore;
};
