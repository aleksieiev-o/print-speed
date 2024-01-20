'use client';

import React, {FC, ReactElement} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-react';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {useTheme} from '@/hooks/useTheme';
import {EAppTheme} from '@/store/SettingsStore/types';
import {useSettingsStore} from '@/store/hooks';

const AppThemeChange: FC = (): ReactElement => {
  const settingsStore = useSettingsStore();
  const { setTheme } = useTheme();

  const handleChangeTheme = async (theme: EAppTheme) => {
    await settingsStore.updateAppTheme(theme);
    await setTheme(EAppTheme.SYSTEM);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size="icon" className="shadow-md" title={'Theme mode menu'}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeTheme(EAppTheme.SYSTEM)}>
          System
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChangeTheme(EAppTheme.LIGHT)}>
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChangeTheme(EAppTheme.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppThemeChange;
