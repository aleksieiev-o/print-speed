import {FC, ReactElement} from 'react';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/hooks/useRemainedLetters';
import {useIsGameActive} from '@/hooks/useIsGameActive';

const LettersCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {remainedLetters} = useRemainedLetters();
  const {isGameActive} = useIsGameActive();

  return (
    <div
      className={'flex gap-2 w-full overflow-hidden'}
      title={isGameActive ?
        `Symbols left: ${remainedLetters} from ${gameStore.text.body.length}`
        :
        `Symbols quantity: ${gameStore.text.body.length}`}>
      <span className={'whitespace-nowrap'}>
        {
          isGameActive ?
            'Symbols left:'
            :
            'Symbols quantity:'
        }
      </span>

      {
        isGameActive &&
        <>
          <strong className={'whitespace-nowrap text-ellipsis overflow-hidden'}>
            {remainedLetters}
          </strong>

          <span>
            from
          </span>
        </>
      }

      <strong className={'whitespace-nowrap text-ellipsis overflow-hidden'}>
        {gameStore.text.body.length}
      </strong>
    </div>
  );
});

export default LettersCounter;
