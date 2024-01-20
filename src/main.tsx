import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import StoreContextProvider from '@/providers/StoreContext.provider';
import { RouterProvider } from 'react-router-dom';
import {router} from '@/Router';
import {ThemeProvider} from '@/providers/Theme.provider';
import LettersCounterProvider from '@/providers/LettersCounter.provider';
import {EAppTheme} from '@/store/SettingsStore/types';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContextProvider>
      <ThemeProvider defaultTheme={EAppTheme.SYSTEM} storageKey={'print-speed-app-ui-theme'}>
        <LettersCounterProvider>
          <RouterProvider router={router}/>
        </LettersCounterProvider>
      </ThemeProvider>
    </StoreContextProvider>
  </React.StrictMode>
);
