import {useLocation, useNavigate} from 'react-router-dom';
import {ERouter} from '@/Router';

interface IUseChangeRoute {
  changeRoute: (to: ERouter) => void;
}

export const useChangeRoute = (): IUseChangeRoute => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const changeRoute = (to: ERouter) => {
    if (location.pathname !== to) {
      navigate(to);
    }
  };
  
  return { changeRoute };
};
