import {RootStore} from '@/store';
import {SettingsStoreService} from './service';
import {EPrintSpeedLevelsList} from '@/store/GameStore/types';

export enum EAppLocale {
  EN_US = 'en-us',
  DE_DE = 'de-de',
  RU_RU = 'ru-ru',
}

export enum EAppLocaleName {
  EN_US = 'English',
  DE_DE = 'Deutsch',
  RU_RU = 'Русский',
}

export enum EAppTheme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum EBaseSettingsEndpoints {
  APP_SETTINGS = '[id]/settings/app-settings',
  GAME_SETTINGS = '[id]/settings/game-settings',
}

export enum ESettingsEndpoints {
  APP_LOCALE = '[id]/settings/app-settings/appLocale',
  APP_THEME = '[id]/settings/app-settings/appTheme',

  PRINT_SPEED = '[id]/settings/game-settings/printSpeedLevel',
}

export interface IAppSettings {
  appLocale: EAppLocale;
  appTheme: EAppTheme;
}

export interface IRemoteGameSettings {
  printSpeedLevel: EPrintSpeedLevelsList;
}

export interface ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  appSettings: IAppSettings;
  remoteGameSettings: IRemoteGameSettings;
}
