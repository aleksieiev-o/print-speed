import {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent} from '@/components/ui/card';
import SettingsAppThemeChange from '@/views/Settings/SettingsAppThemeChange';

const Settings: FC = observer((): ReactElement => {
  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent
          className={
            'max-w-full md:max-w-[640px] h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto'
          }
        >
          <SettingsAppThemeChange />

          {/*<SettingsAppLocaleChange/>*/}
        </CardContent>
      </Card>
    </AppWrapper>
  );
});

export default Settings;
