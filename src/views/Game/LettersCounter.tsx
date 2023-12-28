import {FC, ReactElement} from 'react';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/hooks/useRemainedLetters';

const LettersCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {remainedLetters} = useRemainedLetters();

  return (
    <div className={'flex gap-2'}>
      <span>
        Letters and signs left:
      </span>

      <strong>
        {remainedLetters}
      </strong>

      <span>
        from
      </span>

      <strong>
        {gameStore.text.body.length}
      </strong>
    </div>
  );
});

export default LettersCounter;
