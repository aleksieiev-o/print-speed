import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@/views/Home';
import Game from '@/views/Game';
import TextsList from '@/views/TextsList';
import Settings from '@/views/Settings';
import Authorization from '@/views/Authorization';
import UserProfile from '@/views/UserProfile';

export enum ERouter {
  HOME = '/',
  GAME = '/game',
  TEXTS_LIST = '/texts-list',
  SETTINGS = '/settings',
  USER_PROFILE = '/user-profile',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '*',
}

export enum ERouterTitle {
  HOME = 'Home',
  GAME = 'Game',
  TEXTS_LIST = 'Texts list',
  SETTINGS = 'Settings',
  USER_PROFILE = 'User profile',
  SIGN_IN = 'Sign in',
  SIGN_UP = 'Sign up',
  NOT_FOUND = 'Page not found',
}

export const router = createBrowserRouter([
  { path: ERouter.HOME, element: <Home/> },
  { path: ERouter.GAME, element: <Game/> },
  { path: ERouter.TEXTS_LIST, element: <TextsList/> },
  { path: ERouter.SETTINGS, element: <Settings/> },
  { path: ERouter.USER_PROFILE, element: <UserProfile/> },
  { path: ERouter.SIGN_IN, element: <Authorization/> },
  { path: ERouter.SIGN_UP, element: <Authorization/> },
  { path: ERouter.NOT_FOUND, element: <Navigate to={ERouter.HOME} replace={true}/> },
]);
