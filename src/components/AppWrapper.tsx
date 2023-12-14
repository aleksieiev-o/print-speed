import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/components/AppHeader';
import AppScrollContentWrapper from '@/components/AppScrollContentWrapper';
import VictoryConfetti from '@/components/VictoryConfetti';

const AppWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <div className={'app-wrapper w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      <div className={'app-content w-full h-full flex flex-col items-start justify-start'}>
        <AppHeader/>

        <section className={'w-full h-full overflow-hidden relative'}>
          {
            false && <VictoryConfetti/> /* TODO add check victory status */
          }

          <AppScrollContentWrapper>
            {children}
          </AppScrollContentWrapper>
        </section>

        {/*<Toaster/>*/}
      </div>
    </div>
  );
};

export default AppWrapper;
