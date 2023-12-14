import React, {FC, ReactElement, useMemo} from 'react';
import {CardDescription} from '@/components/ui/card';

const Timer: FC = (): ReactElement => {
  const calculatePrintTime = () => (500 / 50) * 60; // TODO add text.length instead of 500; add lpm to store and to funk instead of 50

  const timer = useMemo(() => calculatePrintTime(), []);

  return (
    <CardDescription className={'flex gap-2 text-md text-foreground'}>
      <span>
        Timer:
      </span>

      <span>
        {timer} sec.
      </span>
    </CardDescription>
  );
};

export default Timer;
