import {useAuthorizationStore} from '@/store/hooks';
import {useLoading} from '@/shared/hooks/useLoading';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/shared/Router';

export const useSignOut = () => {
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();
  const {isLoading, setIsLoading} = useLoading();

  const handleSignOut = async () => {
    setIsLoading(true);
    await authorizationStore.singOut();
    setIsLoading(false);

    navigate(ERouter.SIGN_IN);
  };

  return {isLoading, handleSignOut};
};
