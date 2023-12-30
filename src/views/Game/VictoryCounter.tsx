import {FC, ReactElement} from 'react';
import {Crown} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';

const VictoryCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  return (
    <>
      {
        gameStore.victoryCounter > 0 &&
        <div className={'flex items-center justify-start md:justify-end gap-2 w-full overflow-hidden'} title={`Victory: ${gameStore.victoryCounter}`}>
          <Crown className={'h-6 w-6 stroke-yellow-500'}/>

          <span>
            {
              gameStore.victoryCounter === 1 ?
                'Win:'
                :
                'Wins:'
            }
          </span>

          <strong className={'whitespace-nowrap text-ellipsis overflow-hidden'}>
            {gameStore.victoryCounter}
          </strong>
        </div>
      }
    </>
  );
});

export default VictoryCounter;
