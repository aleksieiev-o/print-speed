import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import StoreContextProvider from '@/providers/StoreContext.provider';
import { RouterProvider } from 'react-router-dom';
import {router} from '@/Router';
import {ThemeProvider} from '@/providers/Theme.provider';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';
import LettersCounterProvider from '@/providers/LettersCounter.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContextProvider>
      <ThemeProvider defaultTheme={AppThemeEnum.SYSTEM} storageKey={'print-speed-app-ui-theme'}>
        <LettersCounterProvider>
          <RouterProvider router={router}/>
        </LettersCounterProvider>
      </ThemeProvider>
    </StoreContextProvider>
  </React.StrictMode>
);
