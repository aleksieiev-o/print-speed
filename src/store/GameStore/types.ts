import {RootStore} from '@/store';
import {GameStoreService} from '@/store/GameStore/service';

export enum EGameActiveStatus {
  STOPPED = 'stopped',
  STARTED = 'active',
  PAUSED = 'paused',
  RESUMED = 'resumed',
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

export interface IText {
  language: string;
  author: string;
  body: string;
}

export interface IGameStore {
  rootStore: RootStore;
  gameStoreService: GameStoreService;
  textPrintTime: number;
  text: IText;
  textsList: Array<IText>;
  victoryCounter: number;
  printSpeedLevel: string;
  gameActiveStatus: EGameActiveStatus;
  gameFinishStatus: EFinishGameStatus;
}
