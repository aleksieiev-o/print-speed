import {FC, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {useAuthorizationStore, useGameStore} from '@/store/hooks';
import {EFinishGameStatus, EGameActiveStatus} from '@/store/GameStore/types';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/shared/hooks/useRemainedLetters';
import {Skeleton} from '@/components/ui/skeleton';

const writtenChar = '*';
const writtenCharRegExp = new RegExp(`\\${writtenChar}`, 'g');

const CurrentText: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const authorizationStore = useAuthorizationStore();
  const {setRemainedLetters} = useRemainedLetters();
  const [currentText, setCurrentText] = useState<string>('');

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      setCurrentText(currentText.replace(event.key, writtenChar));
    },
    [currentText],
  );

  const writtenLetterCount = useMemo((): number => {
    const matchedValues: RegExpMatchArray | null = currentText.match(writtenCharRegExp);
    return matchedValues !== null ? matchedValues.length : 0;
  }, [currentText]);

  const isTextAlreadyWritten: boolean = useMemo(() => {
    if (currentText.length > 0) {
      for (const char of currentText) {
        if (char !== writtenChar) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, [currentText]);

  useEffect(() => {
    setCurrentText(gameStore.text.body);
  }, [gameStore.text.body]);

  useEffect(() => {
    setRemainedLetters(writtenLetterCount);
  }, [setRemainedLetters, writtenLetterCount]);

  useEffect(() => {
    if (isTextAlreadyWritten) {
      gameStore.changeGameActiveStatus(EGameActiveStatus.STOPPED);
      gameStore.changeGameFinishStatus(EFinishGameStatus.SUCCESS);
      gameStore.increaseVictoryCount();
    }
  }, [isTextAlreadyWritten, gameStore]);

  useEffect(() => {
    if (gameStore.isGameStopped) {
      setCurrentText(gameStore.text.body);
    }
  }, [gameStore.isGameStopped, gameStore.text.body]);

  useEffect(() => {
    if (gameStore.isGameRunning) {
      window.addEventListener('keydown', keyDownHandler, false);
    } else if (!gameStore.isGameRunning) {
      window.removeEventListener('keydown', keyDownHandler, false);
    }

    return () => window.removeEventListener('keydown', keyDownHandler, false);
  }, [gameStore.isGameRunning, keyDownHandler]);

  return (
    <div className={'flex flex-col gap-2 overflow-y-auto'}>
      {currentText ? <span className={'text-3xl'}>{currentText}</span> : <Skeleton className={'h-12 w-7/12 bg-white/50'} />}

      {currentText ? (
        <span className={'text-md italic'}>By {!gameStore.text.isCreated ? gameStore.text.author : authorizationStore.userDN}</span>
      ) : (
        <Skeleton className={'h-8 w-3/12 bg-white/50'} />
      )}
    </div>
  );
});

export default CurrentText;
