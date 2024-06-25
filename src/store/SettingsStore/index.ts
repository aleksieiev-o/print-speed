import {makeAutoObservable} from 'mobx';
import {RootStore} from '@/store';
import {SettingsStoreService} from './service';
import {EAppLocale, EAppTheme, EBaseSettingsEndpoints, ESettingsEndpoints, IAppSettings, IRemoteGameSettings, ISettingsStore} from './types';
import {EPrintSpeedLevelsList} from '@/store/GameStore/types';
import {APP_LS_LOCALE_KEY, APP_LS_THEME_KEY} from '@/shared/appConstants';

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;

  settingsStoreService: SettingsStoreService;

  appSettings: IAppSettings;
  gameSettings: IRemoteGameSettings;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.settingsStoreService = new SettingsStoreService(this.rootStore);

    this.appSettings = {
      appLocale: (window.localStorage.getItem(APP_LS_LOCALE_KEY) as EAppLocale) || EAppLocale.EN_US,
      appTheme: (window.localStorage.getItem(APP_LS_THEME_KEY) as EAppTheme) || EAppTheme.SYSTEM,
    };

    this.gameSettings = {
      printSpeedLevel: EPrintSpeedLevelsList.AVERAGE,
    };

    makeAutoObservable(this);
  }

  async fetchAppSettings(): Promise<void> {
    this.appSettings = await this.settingsStoreService.fetchAppSettings();
  }

  async fetchGameSettings(): Promise<void> {
    this.gameSettings = await this.settingsStoreService.fetchGameSettings();
  }

  async createAppSettings(): Promise<void> {
    await this.settingsStoreService.createSettings<IAppSettings, EBaseSettingsEndpoints.APP_SETTINGS>(this.appSettings, EBaseSettingsEndpoints.APP_SETTINGS);
  }

  async createGameSettings(): Promise<void> {
    await this.settingsStoreService.createSettings<IRemoteGameSettings, EBaseSettingsEndpoints.GAME_SETTINGS>(this.gameSettings, EBaseSettingsEndpoints.GAME_SETTINGS);
  }

  async updateAppLocale(value: EAppLocale): Promise<void> {
    this.appSettings.appLocale = await this.settingsStoreService.updateSettingsItem<EAppLocale, ESettingsEndpoints.APP_LOCALE>(value, ESettingsEndpoints.APP_LOCALE);
  }

  async updateAppTheme(value: EAppTheme): Promise<void> {
    this.appSettings.appTheme = await this.settingsStoreService.updateSettingsItem<EAppTheme, ESettingsEndpoints.APP_THEME>(value, ESettingsEndpoints.APP_THEME);
  }

  async updatePrintSpeedLevel(value: EPrintSpeedLevelsList): Promise<void> {
    this.gameSettings.printSpeedLevel = await this.settingsStoreService.updateSettingsItem<EPrintSpeedLevelsList, ESettingsEndpoints.PRINT_SPEED>(
      value,
      ESettingsEndpoints.PRINT_SPEED,
    );
  }
}
