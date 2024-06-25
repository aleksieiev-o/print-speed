import {EFinishGameStatus, EGameActiveStatus, EPrintSpeedLevelsList, IGameStore, IText} from '@/store/GameStore/types';
import {RootStore} from '@/store';
import {GameStoreService} from '@/store/GameStore/service';
import {makeAutoObservable, runInAction} from 'mobx';

export class GameStore implements IGameStore {
  rootStore: RootStore;

  gameStoreService: GameStoreService;

  gameActiveStatus: EGameActiveStatus;
  gameFinishStatus: EFinishGameStatus;
  text: IText;
  textsList: Array<IText>;
  textPrintTime: number;
  victoryCounter: number;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.gameStoreService = new GameStoreService(this);

    this.gameActiveStatus = EGameActiveStatus.STOPPED;
    this.gameFinishStatus = EFinishGameStatus.UNKNOWN;
    this.text = {language: '', author: '', body: ''};
    this.textsList = [];
    this.textPrintTime = 0;
    this.victoryCounter = 0;

    this.fetchTextsList();

    makeAutoObservable(this, {}, {autoBind: true});
  }

  get isGamePreparing(): boolean {
    return this.gameActiveStatus === EGameActiveStatus.PREPARING;
  }

  get isGameRunning(): boolean {
    return this.gameActiveStatus === EGameActiveStatus.STARTED || this.gameActiveStatus === EGameActiveStatus.RESUMED;
  }

  get isGamePaused(): boolean {
    return this.gameActiveStatus === EGameActiveStatus.PAUSED;
  }

  get isGameStopped(): boolean {
    return this.gameActiveStatus === EGameActiveStatus.STOPPED;
  }

  async fetchTextsList(): Promise<void> {
    const data = await this.gameStoreService.fetchTextsList();

    runInAction(() => {
      this.textsList = data;
    });

    this.changeText();
  }

  changeGameActiveStatus(status: EGameActiveStatus): void {
    this.gameActiveStatus = status;

    if (this.gameActiveStatus === EGameActiveStatus.STARTED) {
      this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    }
  }

  changeGameFinishStatus(status: EFinishGameStatus): void {
    this.gameFinishStatus = status;
  }

  async changePrintSpeedLevel(printSpeedLevel: EPrintSpeedLevelsList): Promise<void> {
    this.changeGameActiveStatus(EGameActiveStatus.STOPPED);
    this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    await this.rootStore.settingsStore.updatePrintSpeedLevel(printSpeedLevel);
    this.setTimer();
  }

  changeText(): void {
    this.changeGameActiveStatus(EGameActiveStatus.STOPPED);
    this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    this.text = this.getRandomText();
    this.setTimer();
  }

  setTimer(): void {
    const {printSpeedLevel} = this.rootStore.settingsStore.gameSettings;
    const time = (this.text.body.length / parseInt(printSpeedLevel, 10)) * 60;
    this.textPrintTime = Math.round(time);
  }

  increaseVictoryCount(): void {
    this.victoryCounter++;
  }

  resetVictoryCount(): void {
    this.victoryCounter = 0;
  }

  private getRandomText(): IText {
    const foundText = this.textsList[this.getRandomIdx()];

    if (this.text.body === foundText.body) {
      this.getRandomText();
    }

    return foundText;
  }

  private getRandomIdx(): number {
    return Math.round(Math.random() * (this.textsList.length - 1));
  }
}
