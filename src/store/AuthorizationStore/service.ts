import { User, updateProfile, updateEmail, updatePassword } from '@firebase/auth';
import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential, signInWithEmailAndPassword, signOut, UserCredential, EmailAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import {
  AuthorizationStore,
  IAuthChangeEmailRequestDto, IAuthChangePasswordRequestDto,
  IAuthChangeUserProfileRequestDto
} from './index';
import {IAuthUserCredentialsShape} from '@/store/AuthorizationStore/types';

interface IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;
  signInEmailPassword: (payload: IAuthUserCredentialsShape) => Promise<User>;
  singUpEmailAndPassword: (payload: IAuthUserCredentialsShape) => Promise<User>;
  singOut: () => Promise<void>;
  reAuthUser: (payload: IAuthUserCredentialsShape) => Promise<UserCredential>;
  updateUserProfile: (payload: IAuthChangeUserProfileRequestDto) => void;
  updateUserEmail: (payload: IAuthChangeEmailRequestDto) => void;
  updateUserPassword: (payload: IAuthChangePasswordRequestDto) => void;
}

export class AuthorizationStoreService implements IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;

  constructor(authorizationStore: AuthorizationStore) {
    this.authorizationStore = authorizationStore;
  }

  async signInEmailPassword(payload: IAuthUserCredentialsShape): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email as string, password as string);
    return userCredential.user;
  }

  async singUpEmailAndPassword(payload: IAuthUserCredentialsShape): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email as string, password as string);
    return userCredential.user;
  }

  async singOut(): Promise<void> {
    return await signOut(firebaseAuth);
  }

  async reAuthUser(payload: IAuthUserCredentialsShape): Promise<UserCredential> {
    const { email, password } = payload;
    const credential = EmailAuthProvider.credential(email as string, password as string);
    return await reauthenticateWithCredential(firebaseAuth.currentUser!, credential);
  }

  async updateUserProfile(payload: IAuthChangeUserProfileRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updateProfile(currentUser, payload);
    }
  }

  async updateUserEmail(payload: IAuthChangeEmailRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updateEmail(currentUser, payload.newEmail);
    }
  }

  async updateUserPassword(payload: IAuthChangePasswordRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updatePassword(currentUser, payload.newPassword);
    }
  }

  private static getCurrentUser(): User | null {
    return firebaseAuth.currentUser;
  }
}
