import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/shared/Router';
import {useContext} from 'react';
import {AppAuthContext} from '../providers/AppAuth.provider';

interface IUseSignOut {
  signOut: () => Promise<boolean>;
  signOutLoading: boolean;
}

export const useSignOut = (): IUseSignOut => {
  const navigate = useNavigate();
  const {signOut: handleSignOut, signOutLoading} = useContext(AppAuthContext);

  const signOut = async (): Promise<boolean> => {
    try {
      const result: boolean = await handleSignOut();
      navigate(ERouter.SIGN_IN);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(false);
    }
  };

  return {signOut, signOutLoading};
};
