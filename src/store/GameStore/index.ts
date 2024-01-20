import {EFinishGameStatus, EGameActiveStatus, EPrintSpeedLevelsList, IGameStore, IText} from '@/store/GameStore/types';
import {RootStore} from '@/store';
import {GameStoreService} from '@/store/GameStore/service';
import {makeAutoObservable, runInAction} from 'mobx';

export class GameStore implements IGameStore {
  rootStore: RootStore;

  gameStoreService: GameStoreService;

  gameActiveStatus: EGameActiveStatus;
  gameFinishStatus: EFinishGameStatus;
  printSpeedLevel: string;
  text: IText;
  textsList: Array<IText>;
  textPrintTime: number;
  victoryCounter: number;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.gameStoreService = new GameStoreService(this);

    this.gameActiveStatus = EGameActiveStatus.STOPPED;
    this.gameFinishStatus = EFinishGameStatus.UNKNOWN;
    this.printSpeedLevel = EPrintSpeedLevelsList.AVERAGE;
    this.text = {language: '', author: '', body: ''};
    this.textsList = [];
    this.textPrintTime = 0;
    this.victoryCounter = 0;

    this.fetchTextsList()
      .then(() => {
        this.changeText();
        this.setTimer();
      });

    makeAutoObservable(this, {}, {autoBind: true});
  }
  
  async fetchTextsList(): Promise<void> {
    const data = await this.gameStoreService.fetchTextsList();

    runInAction(() => {
      this.textsList = data;
    });
  }

  changeGameActiveStatus(status: EGameActiveStatus): void {
    this.gameActiveStatus = status;

    if (this.gameActiveStatus === EGameActiveStatus.STARTED) {
      this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    }
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

  changeGameFinishStatus(status: EFinishGameStatus): void {
    this.gameFinishStatus = status;
  }

  changePrintSpeedLevel(printSpeedLevel: EPrintSpeedLevelsList): void {
    this.changeGameActiveStatus(EGameActiveStatus.STOPPED);
    this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    this.printSpeedLevel = printSpeedLevel;
    this.setTimer();
  }

  changeText(): void {
    this.changeGameActiveStatus(EGameActiveStatus.STOPPED);
    this.changeGameFinishStatus(EFinishGameStatus.UNKNOWN);
    this.text = this.getRandomText();
    this.setTimer();
  }

  setTimer(): void {
    const time = this.text.body.length / parseInt(this.printSpeedLevel, 10) * 60;
    this.textPrintTime = Math.round(time);
  }

  increaseVictoryCount(): void {
    this.victoryCounter++;
  }

  resetVictoryCount(): void {
    this.victoryCounter = 0;
  }

  private getRandomText(): IText {
    const randomNumber = Math.round(Math.random() * (this.textsList.length - 1));
    const findText = () => this.textsList.find((item, idx) => idx === randomNumber);
    let foundedText = findText();

    if (this.text.body === foundedText.body) {
      foundedText = findText();
    }

    return foundedText;
  }
}