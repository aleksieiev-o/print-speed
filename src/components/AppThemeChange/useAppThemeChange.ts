import {EAppTheme} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';
import {useLoading} from '@/shared/hooks/useLoading';

export const useAppThemeChange = () => {
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();

  const changeTheme = async (theme: EAppTheme): Promise<void> => {
    try {
      setIsLoading(true);
      await settingsStore.updateAppTheme(theme);
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, changeTheme};
};
