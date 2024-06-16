import {EAppLocale, EAppLocaleName} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMemo, useState} from 'react';

export const useAppLocaleChange = () => {
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();
  const [locale, setLocale] = useState<EAppLocale>(EAppLocale.EN_US);

  const localeList = useMemo(() => {
    return [
      {locale: EAppLocale.EN_US, title: EAppLocaleName.EN_US},
      {locale: EAppLocale.DE_DE, title: EAppLocaleName.DE_DE},
      {locale: EAppLocale.RU_RU, title: EAppLocaleName.RU_RU},
    ];
  }, []);

  const changeLocale = async (locale: EAppLocale) => {
    setIsLoading(true);
    await settingsStore.updateAppLocale(locale);
    await setLocale(locale);
    setIsLoading(false);
  };

  return {isLoading, locale, localeList, changeLocale};
};
