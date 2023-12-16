import {RootStore} from '@/store';
import {GameStoreService} from '@/store/GameStore/service';

export enum EGameActiveStatus {
  STOPPED = 'stopped',
  ACTIVE = 'active',
  PAUSED = 'paused',
}

export enum EPrintSpeedLevelsList {
  VERY_SLOW = '50',
  SLOW = '150',
  AVERAGE = '250',
  FAST = '350',
  VERY_FAST = '450',
  LIGHTNING = '550',
}

export interface IGameStore {
  rootStore: RootStore;
  gameStoreService: GameStoreService;
  timer: number;
  text: string;
  remainedLettersCounter: number;
  victoryCounter: number;
  printSpeedLevel: string;
  gameActiveStatus: EGameActiveStatus;
}
