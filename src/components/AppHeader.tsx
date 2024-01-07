import {FC, ReactElement, useMemo} from 'react';
import AppThemeChange from '@/components/AppThemeChange';
import {observer} from 'mobx-react-lite';
import {useLocation} from 'react-router-dom';
import {ERouter, ERouterTitle} from '@/Router';

const AppHeader: FC = observer((): ReactElement => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    return {
      [ERouter.HOME]: ERouterTitle.HOME,
      [ERouter.GAME]: ERouterTitle.GAME,
      [ERouter.TEXTS_LIST]: ERouterTitle.TEXTS_LIST,
      [ERouter.SETTINGS]: ERouterTitle.SETTINGS,
      [ERouter.SIGN_IN]: ERouterTitle.SIGN_IN,
      [ERouter.SIGN_UP]: ERouterTitle.SIGN_UP,
      [ERouter.NOT_FOUND]: ERouterTitle.NOT_FOUND,
    }[location.pathname] || 'Page title';
  }, [location.pathname]);

  return (
    <header className={'w-full flex flex-row items-center justify-between gap-4 md:gap-6 p-4 md:p-6 overflow-hidden'}>
      <h1 className={'text-3xl font-bold'}>
        {pageTitle}
      </h1>

      <div className={'grid grid-flow-col auto-cols-max gap-4 md:gap-6 items-center'}>
        <AppThemeChange/>

        {/*<AppLocaleChange/>*/}
      </div>
    </header>
  );
});

export default AppHeader;
