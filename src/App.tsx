import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppWrapper from '@/components/AppWrapper';

const App: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <AppWrapper>
      {children}
    </AppWrapper>
  );
};

export default App;
