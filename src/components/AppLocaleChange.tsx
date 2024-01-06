'use client';

import React, {FC, ReactElement, useState} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Languages} from 'lucide-react';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {EAppLocale, EAppLocaleName} from '@/shared/types/appLocale.enum';

const AppLocaleChange: FC = (): ReactElement => {
  const [locale, setLocale] = useState<EAppLocale>(EAppLocale.EN_US);
  console.warn(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size="icon" className="shadow-md" title={'Change locale menu'}>
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />

          <span className="sr-only">
            Toggle locale
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale(EAppLocale.EN_US)}>
          {EAppLocaleName.EN_US}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setLocale(EAppLocale.DE_DE)}>
          {EAppLocaleName.DE_DE}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setLocale(EAppLocale.RU_RU)}>
          {EAppLocaleName.RU_RU}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppLocaleChange;
