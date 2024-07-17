import {makeAutoObservable} from 'mobx';
import {User} from '@firebase/auth';
import {RootStore} from '@/store';
import {onAuthStateChanged} from 'firebase/auth';
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
  user: User | null;
  userLoading: boolean;
  userError: Error | undefined;
  appAuthStatus: EAppAuthStatus;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;

  user: User | null = null;
  userLoading = false;
  userError: Error | undefined = undefined;
  appAuthStatus = EAppAuthStatus.UNDEFINED;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      this.setUserLoading(true);

      await this.initApp(); // TODO change call-place of this method

      if (user && user.uid) {
        await this.fetchRemoteData();
      } else {
        this.resetUserData();
      }

      this.setUserLoading(false);
    });
  }

  get userUid(): string {
    return this.user?.uid || ''; // TODO remove "|| ''" and fix it
  }

  get userDN(): string {
    return this.user?.displayName || DEFAULT_USER_DN;
  }

  get userEmail(): string {
    return this.user?.email || '';
  }

  get isAuth(): boolean {
    return Boolean(this.user);
  }

  get isUserLoading(): boolean {
    return this.userLoading;
  }

  setAppAuthStatus(status: EAppAuthStatus): void {
    this.appAuthStatus = status;
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

  private async reloadUserData(): Promise<void> {
    await firebaseAuth.currentUser?.reload();

    if (firebaseAuth.currentUser) {
      this.user = firebaseAuth.currentUser;
    } else {
      this.resetUserData();
    }
  }

  private resetUserData(): void {
    this.user = null;
  }

  private setUserLoading(status: boolean): void {
    this.userLoading = status;
  }

  // private setUserError(err: Error | undefined): void {
  //   this.userError = err;
  // }
}
