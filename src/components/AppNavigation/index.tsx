import {FC, ReactElement} from 'react';
import AppNavigationHeader from '@/components/AppNavigation/AppNavigationHeader';
import AppNavigationContent from '@/components/AppNavigation/AppNavigationContent';
import AppNavigationFooter from '@/components/AppNavigation/AppNavigationFooter';
import {Card} from '@/components/ui/card';
import {observer} from 'mobx-react-lite';

const AppNavigation: FC = observer((): ReactElement => {
  return (
    <Card className={'h-full min-w-[320px] flex flex-col justify-between overflow-hidden'}>
      <AppNavigationHeader/>

      <AppNavigationContent/>

      <AppNavigationFooter/>
    </Card>
  );
});

export default AppNavigation;
