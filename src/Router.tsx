import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@/views/Home';
import Game from '@/views/Game';
import Authorization from '@/views/Authorization';

export enum ERouter {
  HOME = '/',
  GAME = '/game',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export const router = createBrowserRouter([
  { path: ERouter.HOME, element: <Home/> },
  { path: ERouter.GAME, element: <Game/> },
  { path: ERouter.SIGN_IN, element: <Authorization/> },
  { path: ERouter.SIGN_UP, element: <Authorization/> },
  { path: '*', element: <Navigate to={ERouter.HOME} replace={true}/> },
]);
