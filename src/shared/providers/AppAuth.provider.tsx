import {firebaseAuth} from '@/lib/firebase/firebase';
import {ActionCodeSettings, AuthError, UserCredential} from 'firebase/auth';
import {createContext, FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignOut,
  useUpdateProfile,
  useVerifyBeforeUpdateEmail,
} from 'react-firebase-hooks/auth';
import {useAuthorizationStore, useSettingsStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {User} from '@firebase/auth';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

interface AppAuthProviderState {
  signOut: () => Promise<boolean>;
  signOutLoading: boolean;

  updateProfile: (profile: Profile) => Promise<boolean>;
  updateProfileLoading: boolean;

  sendPasswordResetEmail: (email: string, actionCodeSettings?: ActionCodeSettings) => Promise<boolean>;
  sendPasswordResetEmailLoading: boolean;

  verifyBeforeUpdateEmail: (email: string, actionCodeSettings: ActionCodeSettings | null) => Promise<boolean>;
  verifyBeforeUpdateEmailLoading: boolean;

  signInWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential | undefined>;
  signInLoading: boolean;
  signInError: AuthError | undefined;

  signUpWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential | undefined>;
  signUpLoading: boolean;
  signUpError: AuthError | undefined;
}

const initialState: AppAuthProviderState = {
  signOutLoading: false,
  signOut: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },

  updateProfile: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  updateProfileLoading: false,

  sendPasswordResetEmail: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  sendPasswordResetEmailLoading: false,

  verifyBeforeUpdateEmail: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  verifyBeforeUpdateEmailLoading: false,

  signInWithEmailAndPassword: function () {
    throw new Error('Function not implemented.');
  },
  signInLoading: false,
  signInError: undefined,

  signUpWithEmailAndPassword: function () {
    throw new Error('Function not implemented.');
  },
  signUpLoading: false,
  signUpError: undefined,
};

export const AppAuthContext = createContext<AppAuthProviderState>(initialState);

const AppAuthProvider: FC<PropsWithChildren> = observer((props): ReactElement => {
  const {children} = props;
  const [user, loading, error] = useAuthState(firebaseAuth);

  const [signOut, signOutLoading] = useSignOut(firebaseAuth);
  const [updateProfile, updateProfileLoading] = useUpdateProfile(firebaseAuth);
  const [verifyBeforeUpdateEmail, verifyBeforeUpdateEmailLoading] = useVerifyBeforeUpdateEmail(firebaseAuth);
  const [sendPasswordResetEmail, sendPasswordResetEmailLoading] = useSendPasswordResetEmail(firebaseAuth);
  const [signInWithEmailAndPassword, , signInLoading, signInError] = useSignInWithEmailAndPassword(firebaseAuth);
  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] = useCreateUserWithEmailAndPassword(firebaseAuth);

  const authorizationStore = useAuthorizationStore();
  const settingsStore = useSettingsStore();

  useEffect(() => {
    authorizationStore.setLoading(loading);
    authorizationStore.setUser(user);
    authorizationStore.setError(error);
  }, [user, loading, error, authorizationStore]);

  const signUpWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | undefined> => {
    const user = await createUserWithEmailAndPassword(email, password);

    if (user) {
      authorizationStore.setUser(user.user as User | null | undefined);

      await settingsStore.createAppSettings();
      await settingsStore.createGameSettings();
    }

    return user;
  };

  const value: AppAuthProviderState = {
    signOut,
    signOutLoading,
    updateProfile,
    updateProfileLoading,
    sendPasswordResetEmail,
    sendPasswordResetEmailLoading,
    verifyBeforeUpdateEmail,
    verifyBeforeUpdateEmailLoading,
    signInWithEmailAndPassword,
    signInLoading,
    signInError,
    signUpWithEmailAndPassword,
    signUpLoading,
    signUpError,
  };

  return (
    <AppAuthContext.Provider {...props} value={value}>
      {children}
    </AppAuthContext.Provider>
  );
});

export default AppAuthProvider;
