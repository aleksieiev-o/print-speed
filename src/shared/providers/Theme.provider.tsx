import {createContext, FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import {EAppTheme} from '@/store/SettingsStore/types';
import {observer} from 'mobx-react-lite';
import {useSettingsStore} from '@/store/hooks';
import {APP_LS_THEME_KEY} from '@/shared/appConstants';

export const ThemeProviderContext = createContext({});

const ThemeProvider: FC<PropsWithChildren> = observer((props): ReactElement => {
  const {children} = props;
  const settingsStore = useSettingsStore();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(EAppTheme.LIGHT, EAppTheme.DARK);

    if (settingsStore.appSettings.appTheme === EAppTheme.SYSTEM) {
      const systemTheme = window.matchMedia(`(prefers-color-scheme: ${EAppTheme.DARK})`).matches ? EAppTheme.DARK : EAppTheme.LIGHT;

      root.classList.add(systemTheme);
      localStorage.setItem(APP_LS_THEME_KEY, settingsStore.appSettings.appTheme);
      return;
    }

    root.classList.add(settingsStore.appSettings.appTheme);
    localStorage.setItem(APP_LS_THEME_KEY, settingsStore.appSettings.appTheme);
  }, [settingsStore.appSettings.appTheme]);

  return (
    <ThemeProviderContext.Provider {...props} value={{}}>
      {children}
    </ThemeProviderContext.Provider>
  );
});

export default ThemeProvider;
