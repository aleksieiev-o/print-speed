import {FC, ReactElement} from 'react';
import {CardDescription} from '@/components/ui/card';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';

const Timer: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  return (
    <CardDescription className={'flex gap-2 text-md text-foreground'}>
      <span>
        Timer:
      </span>

      <span>
        {gameStore.timer} sec.
      </span>
    </CardDescription>
  );
});

export default Timer;
