import Bowser from 'bowser';
import {GameStore} from '@/store/GameStore';
import {GlobalLoaderStore} from '@/store/GlobalLoaderStore';
import {AuthorizationStore} from '@/store/AuthorizationStore';

interface IRootStore {
  bowserParser: Bowser.Parser.Parser;
  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  gameStore: GameStore;
}

export class RootStore implements IRootStore {
  bowserParser: Bowser.Parser.Parser;
  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  gameStore: GameStore;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);
    this.globalLoaderStore = new GlobalLoaderStore();
    this.authorizationStore = new AuthorizationStore(this);
    this.gameStore = new GameStore(this);
  }

  get bowserPlatform(): Bowser.Parser.PlatformDetails {
    return this.bowserParser.getPlatform();
  }
}
