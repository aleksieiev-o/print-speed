import {FC, ReactElement} from 'react';
import {CardContent} from '@/components/ui/card';
import {ERouter, ERouterTitle} from '@/shared/Router';
import AppNavigationLink from '@/components/AppNavigation/AppNavigationLink';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {House, SquarePlay, Settings, ClipboardList} from 'lucide-react';

const AppNavigationContent: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <CardContent className={'flex flex-col justify-start mb-auto overflow-hidden'}>
      <ul className={'flex flex-col justify-start gap-4 overflow-x-hidden overflow-y-auto'}>
        <AppNavigationLink to={ERouter.HOME} title={ERouterTitle.HOME} Icon={House} />

        <AppNavigationLink to={ERouter.GAME} title={ERouterTitle.GAME} Icon={SquarePlay} />

        {authorizationStore.isAuth && (
          <>
            <AppNavigationLink to={ERouter.TEXTS_LIST} title={ERouterTitle.TEXTS_LIST} Icon={ClipboardList} />

            <AppNavigationLink to={ERouter.SETTINGS} title={ERouterTitle.SETTINGS} Icon={Settings} />
          </>
        )}
      </ul>
    </CardContent>
  );
});

export default AppNavigationContent;
