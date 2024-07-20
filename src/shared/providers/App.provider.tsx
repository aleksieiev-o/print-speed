import {FC, ReactElement} from 'react';
import StoreProvider from '@/shared/providers/Store.provider';
import ThemeProvider from '@/shared/providers/Theme.provider';
import LettersCounterProvider from '@/shared/providers/LettersCounter.provider';
import AppAuthProvider from './AppAuth.provider';
import VictoryConfettiProvider from './VictoryConfetti.provider';
import AppRouterProvider from './AppRouter.provider';

const AppProvider: FC = (): ReactElement => {
  return (
    <StoreProvider>
      <AppAuthProvider>
        <ThemeProvider>
          <LettersCounterProvider>
            <VictoryConfettiProvider>
              <AppRouterProvider />
            </VictoryConfettiProvider>
          </LettersCounterProvider>
        </ThemeProvider>
      </AppAuthProvider>
    </StoreProvider>
  );
};

export default AppProvider;
