import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import StoreProvider from '@/providers/Store.provider';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/Router';
import {ThemeProvider} from '@/providers/Theme.provider';
import LettersCounterProvider from '@/providers/LettersCounter.provider';
import {EAppTheme} from '@/store/SettingsStore/types';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider
        defaultTheme={EAppTheme.SYSTEM}
        storageKey={'print-speed-app-ui-theme'}
      >
        <LettersCounterProvider>
          <RouterProvider router={router} />
        </LettersCounterProvider>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
);
