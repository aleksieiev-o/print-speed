import {EFinishGameStatus, EGameActiveStatus, EPrintSpeedLevelsList, IGameStore} from '@/store/GameStore/types';
import {RootStore} from '@/store';
import {makeAutoObservable} from 'mobx';
import {IText} from '@/store/TextsStore/types';

export class GameStore implements IGameStore {
  rootStore: RootStore;

  gameActiveStatus: EGameActiveStatus;
  gameFinishStatus: EFinishGameStatus;
  text: IText;
  textPrintTime: number;
  victoryCounter: number;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.gameActiveStatus = EGameActiveStatus.STOPPED;
    this.gameFinishStatus = EFinishGameStatus.UNKNOWN;
    this.text = {
      id: '',
      author: '',
      body: '',
      charQuantity: 0,
      isCustom: false,
      createdDate: '',
      updatedDate: '',
    };
    this.textPrintTime = 0;
    this.victoryCounter = 0;

    makeAutoObservable(this);
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
    const time = (this.text.charQuantity / parseInt(printSpeedLevel, 10)) * 60;
    this.textPrintTime = Math.round(time);
  }

  increaseVictoryCount(): void {
    this.victoryCounter++;
  }

  resetVictoryCount(): void {
    this.victoryCounter = 0;
  }

  private getRandomText(): IText {
    const foundText = this.rootStore.textsStore.textsList[this.getRandomIdx()];

    if (this.text.body === foundText.body) {
      this.getRandomText();
    }

    return foundText;
  }

  private getRandomIdx(): number {
    return Math.round(Math.random() * (this.rootStore.textsStore.textsList.length - 1));
  }
}
