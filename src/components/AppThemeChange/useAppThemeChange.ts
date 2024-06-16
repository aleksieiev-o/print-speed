import {EAppTheme} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';
import {useTheme} from '@/shared/hooks/useTheme';
import {useLoading} from '@/shared/hooks/useLoading';

export const useAppThemeChange = () => {
  const settingsStore = useSettingsStore();
  const {setTheme} = useTheme();
  const {isLoading, setIsLoading} = useLoading();

  const changeTheme = async (theme: EAppTheme) => {
    setIsLoading(true);
    await settingsStore.updateAppTheme(theme);
    await setTheme(theme);
    setIsLoading(false);
  };

  return {isLoading, changeTheme};
};
