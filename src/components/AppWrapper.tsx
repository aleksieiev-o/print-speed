import {FC, PropsWithChildren, ReactElement, useContext} from 'react';
import AppHeader from '@/components/AppHeader';
import {Toaster} from '@/components/ui/toaster';
import AppNavigation from '@/components/AppNavigation';
import VictoryConfetti from '@/components/VictoryConfetti';
import {VictoryConfettiContext} from '@/shared/providers/VictoryConfetti.provider';
import {useDesktopDevice} from '@/shared/hooks/useDesktopDevice';
import AppNotDesktopMessage from './AppNotDesktopMessage';

const AppWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  const {isConfettiStarted} = useContext(VictoryConfettiContext);
  const {isNotDesktop} = useDesktopDevice();

  return (
    <div className={'w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      <section className={'w-full h-full flex flex-col items-start justify-start'}>
        {isNotDesktop ? (
          <AppNotDesktopMessage />
        ) : (
          <section className={'w-full h-full flex flex-row flex-nowrap items-start justify-between gap-4 md:gap-6 p-4'}>
            <AppNavigation />

            <section className={'w-full h-full flex flex-col gap-4 md:gap-6 relative'}>
              <AppHeader />

              {children}
            </section>
          </section>
        )}

        <Toaster />

        {isConfettiStarted && <VictoryConfetti />}
      </section>
    </div>
  );
};

export default AppWrapper;
