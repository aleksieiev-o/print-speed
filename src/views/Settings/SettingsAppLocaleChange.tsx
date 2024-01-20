import {FC, ReactElement, useMemo, useState} from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {EAppLocale, EAppLocaleName} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';
import {useLoading} from '@/hooks/useLoading';
import {observer} from 'mobx-react-lite';

const SettingsAppLocaleChange: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();
  const [locale, setLocale] = useState<EAppLocale>(EAppLocale.EN_US);
  console.warn(locale);

  const themesList = useMemo(() => {
    return [
      {locale: EAppLocale.EN_US, title: EAppLocaleName.EN_US},
      {locale: EAppLocale.DE_DE, title: EAppLocaleName.DE_DE},
      {locale: EAppLocale.RU_RU, title: EAppLocaleName.RU_RU},
    ];
  }, []);

  const handleChangeLocale = async (locale: EAppLocale) => {
    setIsLoading(true);
    await settingsStore.updateAppLocale(locale);
    await setLocale(locale);
    setIsLoading(false);
  };

  return (
    <div className={'flex flex-col gap-2 items-start justify-start'}>
      <h2 className={'text-md font-bold'}>Application language</h2>

      <Select
        onValueChange={(value) => handleChangeLocale(value as EAppLocale)}
        disabled={isLoading}
        defaultValue={settingsStore.appSettings.appLocale}>
        <SelectTrigger title={'Change application language'}>
          <SelectValue placeholder={'Application language'}/>
        </SelectTrigger>

        <SelectContent defaultValue={settingsStore.appSettings.appLocale}>
          <SelectGroup>
            <SelectLabel>
              Application language
            </SelectLabel>

            {
              themesList.map((item) => (
                <SelectItem key={item.locale} value={item.locale}>
                  {item.title}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default SettingsAppLocaleChange;
