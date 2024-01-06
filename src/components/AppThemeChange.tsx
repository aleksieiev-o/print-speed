'use client';

import React, {FC, ReactElement} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-react';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {EAppTheme} from '@/shared/types/appTheme.enum';
import {useTheme} from '@/hooks/useTheme';

const AppThemeChange: FC = (): ReactElement => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size="icon" className="shadow-md" title={'Theme mode menu'}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(EAppTheme.SYSTEM)}>
          System
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme(EAppTheme.LIGHT)}>
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme(EAppTheme.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppThemeChange;
