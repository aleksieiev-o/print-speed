import {FC, ReactElement} from 'react';
import {Loader} from 'lucide-react';

const AppGlobalLoader: FC = (): ReactElement => {
  return (
    <div
      className={
        'w-full h-full overflow-hidden flex items-center justify-center'
      }
    >
      <Loader
        className={'stroke-primary h-20 w-20 animate-spin duration-2000'}
      />
    </div>
  );
};

export default AppGlobalLoader;
