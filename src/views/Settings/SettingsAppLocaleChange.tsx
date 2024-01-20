import {FC, ReactElement} from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {EAppLocale} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useAppLocaleChange} from '@/components/AppLocaleChange/useAppLocaleChange';

const SettingsAppLocaleChange: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const {isLoading, localeList, changeLocale} = useAppLocaleChange();

  return (
    <div className={'flex flex-col gap-2 items-start justify-start'}>
      <h2 className={'text-md font-bold'}>Application language</h2>

      <Select
        onValueChange={(value) => changeLocale(value as EAppLocale)}
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
              localeList.map((item) => (
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
