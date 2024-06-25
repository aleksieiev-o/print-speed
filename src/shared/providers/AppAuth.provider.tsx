import {firebaseAuth} from '@/lib/firebase/firebase';
import {ActionCodeSettings, AuthError, UserCredential} from 'firebase/auth';
import {createContext, FC, PropsWithChildren, ReactElement} from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignOut,
  useUpdateProfile,
  useVerifyBeforeUpdateEmail,
} from 'react-firebase-hooks/auth';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {EAppAuthStatus} from '@/store/AuthorizationStore';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

interface AppAuthProviderState {
  updateProfile: (profile: Profile) => Promise<boolean>;
  updateProfileLoading: boolean;

  sendPasswordResetEmail: (email: string, actionCodeSettings?: ActionCodeSettings) => Promise<boolean>;
  sendPasswordResetEmailLoading: boolean;

  verifyBeforeUpdateEmail: (email: string, actionCodeSettings: ActionCodeSettings | null) => Promise<boolean>;
  verifyBeforeUpdateEmailLoading: boolean;

  baseSignIn: (email: string, password: string) => Promise<UserCredential | undefined>;
  baseSignInLoading: boolean;
  baseSignInError: AuthError | undefined;

  baseSignUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  baseSignUpLoading: boolean;
  baseSignUpError: AuthError | undefined;

  baseSignOut: () => Promise<boolean>;
  signOutLoading: boolean;
}

type TUserCredential = UserCredential | undefined;

const initialState: AppAuthProviderState = {
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

  baseSignIn: function () {
    throw new Error('Function not implemented.');
  },
  baseSignInLoading: false,
  baseSignInError: undefined,

  baseSignUp: function () {
    throw new Error('Function not implemented.');
  },
  baseSignUpLoading: false,
  baseSignUpError: undefined,

  baseSignOut: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  signOutLoading: false,
};

export const AppAuthContext = createContext<AppAuthProviderState>(initialState);

const AppAuthProvider: FC<PropsWithChildren> = observer((props): ReactElement => {
  const {children} = props;

  const [updateProfile, updateProfileLoading] = useUpdateProfile(firebaseAuth);
  const [verifyBeforeUpdateEmail, verifyBeforeUpdateEmailLoading] = useVerifyBeforeUpdateEmail(firebaseAuth);
  const [sendPasswordResetEmail, sendPasswordResetEmailLoading] = useSendPasswordResetEmail(firebaseAuth);
  const [signInWithEmailAndPassword, , baseSignInLoading, baseSignInError] = useSignInWithEmailAndPassword(firebaseAuth);
  const [createUserWithEmailAndPassword, , baseSignUpLoading, baseSignUpError] = useCreateUserWithEmailAndPassword(firebaseAuth);
  const [signOut, signOutLoading] = useSignOut(firebaseAuth);

  const authorizationStore = useAuthorizationStore();

  const baseSignIn = async (email: string, password: string): Promise<TUserCredential> => {
    authorizationStore.setAppAuthStatus(EAppAuthStatus.SIGN_IN);
    return await signInWithEmailAndPassword(email, password);
  };

  const baseSignUp = async (email: string, password: string): Promise<TUserCredential> => {
    authorizationStore.setAppAuthStatus(EAppAuthStatus.SIGN_UP);
    return await createUserWithEmailAndPassword(email, password);
  };

  const baseSignOut = async (): Promise<boolean> => {
    authorizationStore.setAppAuthStatus(EAppAuthStatus.SIGN_OUT);
    return await signOut();
  };

  const value: AppAuthProviderState = {
    updateProfile,
    updateProfileLoading,

    sendPasswordResetEmail,
    sendPasswordResetEmailLoading,

    verifyBeforeUpdateEmail,
    verifyBeforeUpdateEmailLoading,

    baseSignIn,
    baseSignInLoading,
    baseSignInError,

    baseSignUp,
    baseSignUpLoading,
    baseSignUpError,

    baseSignOut,
    signOutLoading,
  };

  return (
    <AppAuthContext.Provider {...props} value={value}>
      {children}
    </AppAuthContext.Provider>
  );
});

export default AppAuthProvider;
