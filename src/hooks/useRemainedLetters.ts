import {useContext} from 'react';
import {LettersCounterContext} from '@/providers/LettersCounter.provider';

export const useRemainedLetters = () => {
  const context = useContext(LettersCounterContext);

  if (context === undefined)
    throw new Error(
      'useRemainedLetters must be used within a LettersCounterProvider',
    );

  return context;
};
