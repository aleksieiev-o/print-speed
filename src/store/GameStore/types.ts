import {RootStore} from '@/store';
import {IText} from '@/store/TextsStore/types';

export enum EGameActiveStatus {
  STOPPED = 'stopped',
  STARTED = 'active',
  PAUSED = 'paused',
  RESUMED = 'resumed',
  PREPARING = 'preparing',
}

export enum EFinishGameStatus {
  UNKNOWN = 'unknown',
  SUCCESS = 'success',
  FAILURE = 'failure',
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
  textPrintTime: number;
  text: IText;
  victoryCounter: number;
  gameActiveStatus: EGameActiveStatus;
  gameFinishStatus: EFinishGameStatus;
}
