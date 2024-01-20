'use client';

import React, {FC, ReactElement, useState} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Languages} from 'lucide-react';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {EAppLocale, EAppLocaleName} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';

const AppLocaleChange: FC = (): ReactElement => {
  const settingsStore = useSettingsStore();
  const [locale, setLocale] = useState<EAppLocale>(EAppLocale.EN_US);
  console.warn(locale);

  const handleChangeLocale = async (locale: EAppLocale) => {
    await settingsStore.updateAppLocale(locale);
    await setLocale(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size="icon" className="shadow-md" title={'Change locale menu'}>
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeLocale(EAppLocale.EN_US)}>
          {EAppLocaleName.EN_US}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChangeLocale(EAppLocale.DE_DE)}>
          {EAppLocaleName.DE_DE}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChangeLocale(EAppLocale.RU_RU)}>
          {EAppLocaleName.RU_RU}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppLocaleChange;
