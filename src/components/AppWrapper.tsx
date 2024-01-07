import {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/components/AppHeader';
import {useGlobalLoaderStore} from '@/store/hooks';
import AppGlobalLoader from '@/components/AppGlobalLoader';
import {observer} from 'mobx-react-lite';
import {Toaster} from '@/components/ui/toaster';
import AppNavigation from '@/components/AppNavigation';

const AppWrapper: FC<PropsWithChildren> = observer(({children}): ReactElement => {
  const {isGlobalLoading} = useGlobalLoaderStore();

  return (
    <div className={'w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      {
        isGlobalLoading ?
          <AppGlobalLoader/>
          :
          <section className={'w-full h-full flex flex-col items-start justify-start'}>
            <section className={'w-full h-full flex flex-row flex-nowrap items-start justify-between gap-4 md:gap-6 p-4'}>
              <AppNavigation/>

              <section className={'w-full h-full flex flex-col gap-4 md:gap-6 relative'}>
                <AppHeader/>

                {children}
              </section>
            </section>

            <Toaster/>
          </section>
      }
    </div>
  );
});

export default AppWrapper;
