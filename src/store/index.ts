import {GameStore} from '@/store/GameStore';

interface IRootStore {
  gameStore: GameStore;
}

export class RootStore implements IRootStore {
  gameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore(this);
  }
}
