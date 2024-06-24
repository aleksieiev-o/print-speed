import {FC, ReactElement} from 'react';
import {CardContent} from '@/components/ui/card';
import {ERouter, ERouterTitle} from '@/shared/Router';
import AppNavigationLink from '@/components/AppNavigation/AppNavigationLink';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

const AppNavigationContent: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <CardContent className={'flex flex-col justify-start mb-auto overflow-hidden'}>
      <ul className={'flex flex-col justify-start gap-4 overflow-x-hidden overflow-y-auto'}>
        <AppNavigationLink to={ERouter.HOME} title={ERouterTitle.HOME} />

        <AppNavigationLink to={ERouter.GAME} title={ERouterTitle.GAME} />

        {authorizationStore.user && (
          <>
            <AppNavigationLink to={ERouter.TEXTS_LIST} title={ERouterTitle.TEXTS_LIST} />

            <AppNavigationLink to={ERouter.SETTINGS} title={ERouterTitle.SETTINGS} />
          </>
        )}
      </ul>
    </CardContent>
  );
});

export default AppNavigationContent;
