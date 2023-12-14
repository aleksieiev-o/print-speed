import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import Start from '@/views/Start';
import Game from '@/views/Game';

export enum EnumRouter {
  START = '/',
  GAME = '/game',
  // SIGN_IN = '/sign-in', // TODO add authorization page
  // SIGN_UP = '/sign-up', // TODO add authorization page
}

export const router = createBrowserRouter([
  { path: EnumRouter.START, element: <Start/> },
  { path: EnumRouter.GAME, element: <Game/> },
  // { path: EnumRouter.SIGN_IN, element: <Authorization/> },
  // { path: EnumRouter.SIGN_UP, element: <Authorization/> },
  { path: '*', element: <Navigate to={EnumRouter.START} replace={true}/> },
]);
