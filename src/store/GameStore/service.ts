import {EGameActiveStatus, EPrintSpeedLevelsList} from '@/store/GameStore/types';
import {GameStore} from '@/store/GameStore/index';

interface IGameStoreService {
  gameStore: GameStore;
}

export class GameStoreService implements IGameStoreService {
  gameStore: GameStore;

  constructor(gameStore: GameStore) {
    this.gameStore = gameStore;
  }

  changeGameActiveStatus(status: EGameActiveStatus): void {
    this.gameStore.gameActiveStatus = status;
  }

  changePrintSpeedLevel(printSpeedLevel: EPrintSpeedLevelsList): void {
    this.gameStore.printSpeedLevel = printSpeedLevel;
    this.setTimer();
  }

  changeText(text: string): void {
    this.gameStore.text = text;
    this.setTimer();
  }

  setTimer(): void {
    const time = this.gameStore.text.length / parseInt(this.gameStore.printSpeedLevel, 10) * 60;
    this.gameStore.timer = Math.round(time);
  }

  private changeRemainedLettersCounter(): void {
    this.gameStore.remainedLettersCounter -= 1;
  }

  private changeVictoryCount(): void {
    this.gameStore.victoryCounter += 1;
  }

  private resetVictoryCount(): void {
    this.gameStore.victoryCounter = 0;
  }
}
