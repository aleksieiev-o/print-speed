import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@/views/Home';
import Game from '@/views/Game';
import Authorization from '@/views/Authorization';

export enum EnumRouter {
  HOME = '/',
  GAME = '/game',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export const router = createBrowserRouter([
  { path: EnumRouter.HOME, element: <Home/> },
  { path: EnumRouter.GAME, element: <Game/> },
  { path: EnumRouter.SIGN_IN, element: <Authorization/> },
  { path: EnumRouter.SIGN_UP, element: <Authorization/> },
  { path: '*', element: <Navigate to={EnumRouter.HOME} replace={true}/> },
]);
