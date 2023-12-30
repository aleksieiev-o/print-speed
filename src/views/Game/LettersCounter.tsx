import {FC, ReactElement} from 'react';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/hooks/useRemainedLetters';

const LettersCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {remainedLetters} = useRemainedLetters();

  return (
    <div
      className={'flex gap-2 w-full overflow-hidden'}
      title={gameStore.isGameStopped ?
        `Symbols quantity: ${gameStore.text.body.length}`
        :
        `Symbols left: ${remainedLetters} from ${gameStore.text.body.length}`}>
      <span className={'whitespace-nowrap'}>
        {
          gameStore.isGameStopped ?
            'Symbols quantity:'
            :
            'Symbols left:'
        }
      </span>

      {
        !gameStore.isGameStopped &&
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
