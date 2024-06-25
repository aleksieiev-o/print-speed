import {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/components/AppHeader';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {Toaster} from '@/components/ui/toaster';
import AppNavigation from '@/components/AppNavigation';
import {EFinishGameStatus} from '@/store/GameStore/types';
import VictoryConfetti from '@/components/VictoryConfetti';

const AppWrapper: FC<PropsWithChildren> = observer(({children}): ReactElement => {
  const gameStore = useGameStore();

  return (
    <div className={'w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      <section className={'w-full h-full flex flex-col items-start justify-start'}>
        <section className={'w-full h-full flex flex-row flex-nowrap items-start justify-between gap-4 md:gap-6 p-4'}>
          <AppNavigation />

          <section className={'w-full h-full flex flex-col gap-4 md:gap-6 relative'}>
            <AppHeader />

            {children}
          </section>
        </section>

        <Toaster />

        {gameStore.gameFinishStatus === EFinishGameStatus.SUCCESS && <VictoryConfetti />}
      </section>
    </div>
  );
});

export default AppWrapper;
