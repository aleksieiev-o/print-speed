import {FC, ReactElement} from 'react';
import AppThemeChange from '@/components/AppThemeChange';
import {Snail} from 'lucide-react';

const AppHeader: FC = (): ReactElement => {
  return (
    <header className={'w-full h-20 flex flex-row items-center justify-between overflow-hidden border-b shadow-md px-4 md:px-6'}>
      <div className={'h-full'}>
        <Snail className={'stroke-primary h-full w-full'}/>
      </div>

      <div className={'h-20 grid grid-flow-col auto-cols-max gap-4 md:gap-8 items-center'}>
        <AppThemeChange/>

        {/*<AppLocaleChange/>*/}
      </div>
    </header>
  );
};

export default AppHeader;
