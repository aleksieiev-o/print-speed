import {FC, ReactElement} from 'react';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/shared/hooks/useRemainedLetters';
import {useIsGameActive} from '@/shared/hooks/useIsGameActive';
import {Skeleton} from '@/components/ui/skeleton';

const LettersCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {remainedLetters} = useRemainedLetters();
  const {isGameActive} = useIsGameActive();

  return (
    <>
      {gameStore.text.body ? (
        <div
          className={'flex gap-2 w-full overflow-hidden'}
          title={isGameActive ? `Symbols left: ${remainedLetters} from ${gameStore.text.charQuantity}` : `Symbols quantity: ${gameStore.text.charQuantity}`}
        >
          <span className={'whitespace-nowrap'}>{isGameActive ? 'Symbols left:' : 'Symbols quantity:'}</span>

          {isGameActive && (
            <>
              <strong className={'whitespace-nowrap text-ellipsis overflow-hidden'}>{remainedLetters}</strong>

              <span>from</span>
            </>
          )}

          <strong className={'whitespace-nowrap text-ellipsis overflow-hidden'}>{gameStore.text.charQuantity}</strong>
        </div>
      ) : (
        <Skeleton className={'h-8 w-3/12 bg-white/50'} />
      )}
    </>
  );
});

export default LettersCounter;
