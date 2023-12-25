import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@/views/Home';
import Game from '@/views/Game';

export enum EnumRouter {
  HOME = '/',
  GAME = '/game',
  // SIGN_IN = '/sign-in', // TODO add authorization page
  // SIGN_UP = '/sign-up', // TODO add authorization page
}

export const router = createBrowserRouter([
  { path: EnumRouter.HOME, element: <Home/> },
  { path: EnumRouter.GAME, element: <Game/> },
  // { path: EnumRouter.SIGN_IN, element: <Authorization/> },
  // { path: EnumRouter.SIGN_UP, element: <Authorization/> },
  { path: '*', element: <Navigate to={EnumRouter.HOME} replace={true}/> },
]);
