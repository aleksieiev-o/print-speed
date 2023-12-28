import {FC, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {useGameStore} from '@/store/hooks';
import {EGameActiveStatus} from '@/store/GameStore/types';
import {observer} from 'mobx-react-lite';
import {useRemainedLetters} from '@/hooks/useRemainedLetters';

const writtenChar = '*';
const writtenCharRegExp = new RegExp(`\\${writtenChar}`, 'g');

const CurrentText: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {setRemainedLetters} = useRemainedLetters();
  const [currentText, setCurrentText] = useState<string>('');

  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    setCurrentText(currentText.replace(event.key, writtenChar));
  }, [currentText]);

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
    }
  }, [isTextAlreadyWritten, gameStore]);

  useEffect(() => {
    if (gameStore.gameActiveStatus === EGameActiveStatus.STOPPED) {
      setCurrentText(gameStore.text.body);
    }
  }, [gameStore.gameActiveStatus, gameStore.text.body]);

  useEffect(() => {
    if (gameStore.gameActiveStatus === EGameActiveStatus.ACTIVE || gameStore.gameActiveStatus === EGameActiveStatus.RESUMED) {
      window.addEventListener('keydown', keyDownHandler, false);
    } else if (gameStore.gameActiveStatus === EGameActiveStatus.STOPPED || gameStore.gameActiveStatus === EGameActiveStatus.PAUSED) {
      window.removeEventListener('keydown', keyDownHandler, false);
    }

    return () => window.removeEventListener('keydown', keyDownHandler, false);
  }, [gameStore.gameActiveStatus, keyDownHandler]);

  return (
    <div className={'overflow-y-auto'}>
      <p className={'text-2xl'}>
        {currentText}
      </p>

      <p className={'text-md italic'}>
        By {gameStore.text.author}
      </p>
    </div>
  );
});

export default CurrentText;
