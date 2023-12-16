import {EGameActiveStatus, EPrintSpeedLevelsList, IGameStore} from '@/store/GameStore/types';
import {RootStore} from '@/store';
import {GameStoreService} from '@/store/GameStore/service';
import {makeAutoObservable} from 'mobx';

export class GameStore implements IGameStore {
  rootStore: RootStore;

  gameStoreService: GameStoreService;

  gameActiveStatus: EGameActiveStatus;
  printSpeedLevel: string;
  remainedLettersCounter: number;
  text: string;
  timer: number;
  victoryCounter: number;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.gameStoreService = new GameStoreService(this);

    this.gameActiveStatus = EGameActiveStatus.STOPPED;
    this.printSpeedLevel = EPrintSpeedLevelsList.AVERAGE;
    this.remainedLettersCounter = 0;
    this.text = '';
    this.timer = 0;
    this.victoryCounter = 0;

    this.gameStoreService.changeText('The goal of the game is to type letters and symbols, except spaces, as quickly as possible before the time runs out');
    this.gameStoreService.setTimer();

    makeAutoObservable(this, {}, {autoBind: true});
  }
}