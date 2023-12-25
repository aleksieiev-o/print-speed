import {createContext, FC, ReactElement, useEffect, useState} from 'react';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';

interface Props {
  children: ReactElement;
  defaultTheme: AppThemeEnum;
  storageKey: 'print-speed-app-ui-theme';
}

interface ThemeProviderState {
  theme: AppThemeEnum;
  setTheme: (theme: AppThemeEnum) => void;
}

const initialState: ThemeProviderState = {
  theme: AppThemeEnum.SYSTEM,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider: FC<Props> = (props) => {
  const {children, defaultTheme, storageKey} = props;

  const [theme, setTheme] = useState<AppThemeEnum>(
    () => (localStorage.getItem(storageKey) as AppThemeEnum) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(AppThemeEnum.LIGHT, AppThemeEnum.DARK);

    if (theme === 'system') {
      const systemTheme = window.matchMedia(`(prefers-color-scheme: ${AppThemeEnum.DARK})`)
        .matches
        ? AppThemeEnum.DARK
        : AppThemeEnum.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: AppThemeEnum) => {
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
