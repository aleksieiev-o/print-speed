import {FC, ReactElement, useMemo} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {observer} from 'mobx-react-lite';
import {useSettingsStore} from '@/store/hooks';
import {EAppTheme} from '@/store/SettingsStore/types';
import {useAppThemeChange} from '@/components/AppThemeChange/useAppThemeChange';

const SettingsAppThemeChange: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const {isLoading, changeTheme} = useAppThemeChange();

  const themesList = useMemo(() => {
    return [
      {theme: EAppTheme.SYSTEM, title: 'System'},
      {theme: EAppTheme.LIGHT, title: 'Light'},
      {theme: EAppTheme.DARK, title: 'Dark'},
    ];
  }, []);

  return (
    <div className={'flex flex-col gap-2 items-start justify-start'}>
      <h2 className={'text-md font-bold'}>Application theme</h2>

      <Select onValueChange={(value) => changeTheme(value as EAppTheme)} disabled={isLoading} defaultValue={settingsStore.appSettings.appTheme}>
        <SelectTrigger title={'Change application theme'}>
          <SelectValue placeholder={'Application theme'} />
        </SelectTrigger>

        <SelectContent defaultValue={settingsStore.appSettings.appTheme}>
          <SelectGroup>
            <SelectLabel>Application theme</SelectLabel>

            {themesList.map((item) => (
              <SelectItem key={item.theme} value={item.theme}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default SettingsAppThemeChange;
