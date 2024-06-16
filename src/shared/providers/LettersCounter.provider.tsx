import {createContext, FC, ReactElement, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';

interface Props {
  children: ReactElement;
}

interface LettersCounterProviderState {
  remainedLetters: number;
  setRemainedLetters: (letter: number) => void;
}

const initialState: LettersCounterProviderState = {
  remainedLetters: 0,
  setRemainedLetters: () => null,
};

export const LettersCounterContext =
  createContext<LettersCounterProviderState>(initialState);

const LettersCounterProvider: FC<Props> = observer((props): ReactElement => {
  const {children} = props;
  const gameStore = useGameStore();
  const [letters, setLetters] = useState<number>(initialState.remainedLetters);

  useEffect(() => {
    setLetters(gameStore.text.body.length);
  }, [gameStore.text.body]);

  const value = {
    remainedLetters: letters,
    setRemainedLetters: (letter: number) =>
      setLetters(gameStore.text.body.length - letter),
  };

  return (
    <LettersCounterContext.Provider {...props} value={value}>
      {children}
    </LettersCounterContext.Provider>
  );
});

export default LettersCounterProvider;
