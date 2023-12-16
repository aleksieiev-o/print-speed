import {IText} from '@/store/GameStore/types';
import {GameStore} from '@/store/GameStore/index';

interface IGameStoreService {
  gameStore: GameStore;
}

export class GameStoreService implements IGameStoreService {
  gameStore: GameStore;

  constructor(gameStore: GameStore) {
    this.gameStore = gameStore;
  }

  async fetchTextsList(): Promise<Array<IText>> {
    const data = await fetch('/text_list.json');
    return await data.json();
  }
}
