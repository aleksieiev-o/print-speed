import {FC, ReactElement} from 'react';
import StoreProvider from '@/shared/providers/Store.provider';
import ThemeProvider from '@/shared/providers/Theme.provider';
import LettersCounterProvider from '@/shared/providers/LettersCounter.provider';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/shared/Router';
import AppAuthProvider from './AppAuth.provider';

const AppProvider: FC = (): ReactElement => {
  return (
    <StoreProvider>
      <AppAuthProvider>
        <ThemeProvider>
          <LettersCounterProvider>
            <RouterProvider router={router} />
          </LettersCounterProvider>
        </ThemeProvider>
      </AppAuthProvider>
    </StoreProvider>
  );
};

export default AppProvider;
