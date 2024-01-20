import {child, DataSnapshot, get, ref, set} from 'firebase/database';
import {EBaseSettingsEndpoints, IAppSettings, IRemoteGameSettings, ESettingsEndpoints} from './types';
import {firebaseDataBase} from '@/lib/firebase';
import {RootStore} from '@/store';

interface ISettingsStoreService {
  rootStore: RootStore;

  fetchAppSettings: () => Promise<IAppSettings>;
  fetchGameSettings: () => Promise<IRemoteGameSettings>;

  createSettings: <T, P>(value: T, endpoint: P & EBaseSettingsEndpoints) => void;
  updateSettingsItem: <T, P>(value: T, endpoint: P & ESettingsEndpoints) => Promise<T>;
}

export class SettingsStoreService implements ISettingsStoreService {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async fetchAppSettings(): Promise<IAppSettings> {
    return await this.fetchSettings<IAppSettings, EBaseSettingsEndpoints.APP_SETTINGS>(EBaseSettingsEndpoints.APP_SETTINGS);
  }

  async fetchGameSettings(): Promise<IRemoteGameSettings> {
    return await this.fetchSettings<IRemoteGameSettings, EBaseSettingsEndpoints.GAME_SETTINGS>(EBaseSettingsEndpoints.GAME_SETTINGS);
  }

  async createSettings<T, P>(value: T, endpoint: P & EBaseSettingsEndpoints) {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
    }
  }

  async updateSettingsItem<T, P>(value: T, endpoint: P & ESettingsEndpoints): Promise<T> {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
      return await this.fetchSettingsItem<T, P>(endpoint);
    }

    return Promise.resolve(value);
  }

  private async fetchSettings<T, P>(endpoint: P & EBaseSettingsEndpoints): Promise<T> {
    const path = this.getSettingsEndpoint(endpoint);
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
    return snapshot.val();
  }

  private async fetchSettingsItem<T, P>(endpoint: P & ESettingsEndpoints): Promise<T> {
    const path = this.getSettingsEndpoint(endpoint);
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
    return snapshot.val();
  }

  private getSettingsEndpoint(endpoint: ESettingsEndpoints | EBaseSettingsEndpoints): string {
    return `${endpoint}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }
}
