import Bowser from 'bowser';
import {GameStore} from '@/store/GameStore';
import {GlobalLoaderStore} from '@/store/GlobalLoaderStore';
import {AuthorizationStore} from '@/store/AuthorizationStore';
import {SettingsStore} from '@/store/SettingsStore';

interface IRootStore {
  bowserParser: Bowser.Parser.Parser;
  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  gameStore: GameStore;
  settingsStore: SettingsStore;
}

export class RootStore implements IRootStore {
  bowserParser: Bowser.Parser.Parser;
  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
  gameStore: GameStore;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);
    this.globalLoaderStore = new GlobalLoaderStore();
    this.authorizationStore = new AuthorizationStore(this);
    this.settingsStore = new SettingsStore(this);
    this.gameStore = new GameStore(this);
  }

  get bowserPlatform(): Bowser.Parser.PlatformDetails {
    return this.bowserParser.getPlatform();
  }
}
