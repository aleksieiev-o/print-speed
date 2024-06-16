import React, {FC, ReactElement} from 'react';
import StoreProvider from '@/shared/providers/Store.provider';
import {ThemeProvider} from '@/shared/providers/Theme.provider';
import {EAppTheme} from '@/store/SettingsStore/types';
import LettersCounterProvider from '@/shared/providers/LettersCounter.provider';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/shared/Router';
import {ComposeChildren} from '@/lib/react/ComposeChildren';

const AppProvider: FC = (): ReactElement => {
  return (
    <ComposeChildren>
      <StoreProvider />
      <ThemeProvider
        defaultTheme={EAppTheme.SYSTEM}
        storageKey={'print-speed-app-ui-theme'}
      />
      <LettersCounterProvider />
      <RouterProvider router={router} />
    </ComposeChildren>
  );
};

export default AppProvider;
