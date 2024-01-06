import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@/views/Home';
import Game from '@/views/Game';
import Settings from '@/views/Settings';
import Authorization from '@/views/Authorization';

export enum ERouter {
  HOME = '/',
  GAME = '/game',
  SETTINGS = '/settings',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '*',
}

export const router = createBrowserRouter([
  { path: ERouter.HOME, element: <Home/> },
  { path: ERouter.GAME, element: <Game/> },
  { path: ERouter.SETTINGS, element: <Settings/> },
  { path: ERouter.SIGN_IN, element: <Authorization/> },
  { path: ERouter.SIGN_UP, element: <Authorization/> },
  { path: ERouter.NOT_FOUND, element: <Navigate to={ERouter.HOME} replace={true}/> },
]);
