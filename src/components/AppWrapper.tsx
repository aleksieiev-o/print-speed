import {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/components/AppHeader';
import AppScrollContentWrapper from '@/components/AppScrollContentWrapper';
import {useGlobalLoaderStore} from '@/store/hooks';
import AppGlobalLoader from '@/components/AppGlobalLoader';
import {observer} from 'mobx-react-lite';

const AppWrapper: FC<PropsWithChildren> = observer(({children}): ReactElement => {
  const {isGlobalLoading} = useGlobalLoaderStore();

  return (
    <div className={'app-wrapper w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      {
        isGlobalLoading ?
          <AppGlobalLoader/>
          :
          <div className={'app-content w-full h-full flex flex-col items-start justify-start'}>
            <AppHeader/>

            <section className={'w-full h-full overflow-hidden relative'}>
              <AppScrollContentWrapper>
                {children}
              </AppScrollContentWrapper>
            </section>

            {/*<Toaster/>*/}
          </div>
      }
    </div>
  );
});

export default AppWrapper;
