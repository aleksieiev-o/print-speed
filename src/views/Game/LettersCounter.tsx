import {FC, ReactElement} from 'react';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

const LettersCounter: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  return (
    <div className={'flex gap-2'}>
      <span>
        Letters and signs left:
      </span>

      <strong>
        10???
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
