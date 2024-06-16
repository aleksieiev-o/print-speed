import {createContext, FC, ReactElement, useEffect, useState} from 'react';
import {EAppTheme} from '@/store/SettingsStore/types';

interface Props {
  children: ReactElement;
  defaultTheme: EAppTheme;
  storageKey: 'print-speed-app-ui-theme';
}

interface ThemeProviderState {
  theme: EAppTheme;
  setTheme: (theme: EAppTheme) => void;
}

const initialState: ThemeProviderState = {
  theme: EAppTheme.SYSTEM,
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export const ThemeProvider: FC<Props> = (props) => {
  const {children, defaultTheme, storageKey} = props;

  const [theme, setTheme] = useState<EAppTheme>(
    () => (localStorage.getItem(storageKey) as EAppTheme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(EAppTheme.LIGHT, EAppTheme.DARK);

    if (theme === 'system') {
      const systemTheme = window.matchMedia(
        `(prefers-color-scheme: ${EAppTheme.DARK})`,
      ).matches
        ? EAppTheme.DARK
        : EAppTheme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: EAppTheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
