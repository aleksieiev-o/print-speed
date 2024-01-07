import {FC, ReactElement} from 'react';
import {CardHeader} from '@/components/ui/card';
import {ERouter} from '@/Router';
import {Snail} from 'lucide-react';
import {Link} from 'react-router-dom';

const AppNavigationHeader: FC = (): ReactElement => {
  return (
    <CardHeader>
      <Link to={ERouter.HOME} className={'w-full h-full flex flex-row items-end justify-start gap-4'}>
        <Snail className={'stroke-primary h-[60px] w-[60px] pointer'}/>

        <span className={'text-2xl font-bold text-primary whitespace-nowrap'}>
          Print speed
        </span>
      </Link>
    </CardHeader>
  );
};

export default AppNavigationHeader;
