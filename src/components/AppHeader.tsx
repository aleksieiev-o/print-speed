import React, {FC, ReactElement} from 'react';

const AppHeader: FC = (): ReactElement => {
  return (
    <header className={'w-full h-20 flex flex-row items-center justify-between overflow-hidden border-b shadow-md pl-2 md:pl-4 pr-4 md:pr-8'}>
      <div className={'h-full'}>
        Print speed
      </div>

      <div className={'h-20 grid grid-flow-col auto-cols-max gap-4 md:gap-8 items-center'}>
        {/*<AppThemeChange/>*/}

        {/*<AppLocaleChange/>*/}
      </div>
    </header>
  );
};

export default AppHeader;
