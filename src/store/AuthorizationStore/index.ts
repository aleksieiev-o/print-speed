import {makeAutoObservable} from 'mobx';
import {User} from '@firebase/auth';
import {RootStore} from '@/store';
import {onAuthStateChanged, UserMetadata} from 'firebase/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {DEFAULT_USER_DN} from '@/shared/appConstants';

export enum EAppAuthStatus {
  UNDEFINED,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
}

interface IAuthorizationStore {
  rootStore: RootStore;
  userUID: string;
  userDN: string;
  userEmail: string;
  userMetadata: UserMetadata;
  userError: Error | undefined;
  appAuthStatus: EAppAuthStatus;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;

  private user: User | null = null;
  userUID = '';
  userDN = DEFAULT_USER_DN;
  userEmail = '';
  userMetadata: UserMetadata = {};
  userError: Error | undefined = undefined;
  appAuthStatus = EAppAuthStatus.UNDEFINED;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      await this.initApp(); // TODO change call-place of this method

      if (user && user.uid) {
        await this.fetchRemoteData();
      } else {
        this.resetUserData();
      }
    });
  }

  get isAuth(): boolean {
    return Boolean(this.user);
  }

  setAppAuthStatus(status: EAppAuthStatus): void {
    this.appAuthStatus = status;
  }

  async reloadUserData(): Promise<void> {
    await firebaseAuth.currentUser?.reload();

    if (firebaseAuth.currentUser) {
      this.user = firebaseAuth.currentUser;

      this.setUserData(this.user);
    } else {
      this.resetUserData();
    }
  }

  private setUserData(user: User | null) {
    this.userUID = user?.uid || '';
    this.userDN = user?.displayName || DEFAULT_USER_DN;
    this.userEmail = user?.email || '';
    this.userMetadata = user?.metadata || {};
  }

  private async initApp(): Promise<void> {
    await this.rootStore.textsStore.fetchBuiltInTextsList();
    this.rootStore.gameStore.changeText();
  }

  private async fetchRemoteData(): Promise<void> {
    await this.reloadUserData();

    if (this.appAuthStatus === EAppAuthStatus.SIGN_UP) {
      await this.rootStore.settingsStore.createAppSettings();
      await this.rootStore.settingsStore.createGameSettings();
    }

    await this.rootStore.settingsStore.fetchAppSettings();
    await this.rootStore.settingsStore.fetchGameSettings();

    await this.rootStore.textsStore.fetchCreatedTextsList();
  }

  private resetUserData(): void {
    this.user = null;
  }

  // private setUserError(err: Error | undefined): void {
  //   this.userError = err;
  // }
}
