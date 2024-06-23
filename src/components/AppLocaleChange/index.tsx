import {FC, ReactElement} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Languages} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {useAppLocaleChange} from '@/components/AppLocaleChange/useAppLocaleChange';
import {observer} from 'mobx-react-lite';

const AppLocaleChange: FC = observer((): ReactElement => {
  const {isLoading, localeList, changeLocale} = useAppLocaleChange();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'default'}
          size="icon"
          className="shadow-md"
          title={'Change locale menu'}
          disabled={isLoading}
        >
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {localeList.map((item) => (
          <DropdownMenuItem
            key={item.locale}
            onClick={() => changeLocale(item.locale)}
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default AppLocaleChange;
