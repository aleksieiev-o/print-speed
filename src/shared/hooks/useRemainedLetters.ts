import {useContext} from 'react';
import {LettersCounterContext} from '@/shared/providers/LettersCounter.provider';

export const useRemainedLetters = () => {
  const context = useContext(LettersCounterContext);

  if (context === undefined) throw new Error('useRemainedLetters must be used within a LettersCounterProvider');

  return context;
};
