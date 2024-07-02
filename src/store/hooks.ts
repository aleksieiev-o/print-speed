import {useContext} from 'react';
import {RootStore} from './index';
import {StoreContext} from '@/shared/providers/Store.provider';
import {GameStore} from '@/store/GameStore';
import {GlobalLoaderStore} from '@/store/GlobalLoaderStore';
import {AuthorizationStore} from '@/store/AuthorizationStore';
import {SettingsStore} from '@/store/SettingsStore';
import {TextsStore} from '@/store/TextsStore';

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within StoreProvider');
  }
  return context;
};

export const useGlobalLoaderStore = (): GlobalLoaderStore => {
  const {globalLoaderStore} = useRootStore();
  return globalLoaderStore;
};

export const useAuthorizationStore = (): AuthorizationStore => {
  const {authorizationStore} = useRootStore();
  return authorizationStore;
};

export const useTextsStore = (): TextsStore => {
  const {textsStore} = useRootStore();
  return textsStore;
};

export const useGameStore = (): GameStore => {
  const {gameStore} = useRootStore();
  return gameStore;
};

export const useSettingsStore = (): SettingsStore => {
  const {settingsStore} = useRootStore();
  return settingsStore;
};
