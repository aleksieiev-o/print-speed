import Bowser from 'bowser';
import {GameStore} from '@/store/GameStore';

interface IRootStore {
  bowserParser: Bowser.Parser.Parser;
  gameStore: GameStore;
}

export class RootStore implements IRootStore {
  bowserParser: Bowser.Parser.Parser;
  gameStore: GameStore;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);
    this.gameStore = new GameStore(this);
  }

  get bowserPlatform(): Bowser.Parser.PlatformDetails {
    return this.bowserParser.getPlatform();
  }
}
