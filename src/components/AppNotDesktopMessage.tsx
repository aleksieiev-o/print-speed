import {Computer} from 'lucide-react';
import {FC, ReactElement} from 'react';

const AppNotDesktopMessage: FC = (): ReactElement => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-6">
      <Computer className="h-10 w-10" />

      <p className={'text-center font-bold'}>You can use this application only on a personal computer</p>
    </section>
  );
};

export default AppNotDesktopMessage;
