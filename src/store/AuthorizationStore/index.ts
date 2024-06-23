import {makeAutoObservable} from 'mobx';
import {User} from '@firebase/auth';
import {RootStore} from '@/store';

interface IAuthorizationStore {
  rootStore: RootStore;
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;

  user: User | null | undefined = null;
  loading: boolean = false;
  error: Error | undefined = undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  setUser(user: User | null | undefined): void {
    this.user = user;
  }

  setLoading(status: boolean): void {
    this.loading = status;
  }

  setError(err: Error | undefined): void {
    this.error = err;
  }

  get userUid(): string {
    return this.user?.uid || ''; // TODO remove "|| ''" and fix it
  }

  get isAuth(): boolean {
    return Boolean(this.user);
  }
}
