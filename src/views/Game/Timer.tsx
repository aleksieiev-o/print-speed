import React, {FC, ReactElement} from 'react';
import {CardDescription} from '@/components/ui/card';

interface Props {
  timer: number;
}

const Timer: FC<Props> = (props): ReactElement => {
  const {timer} = props;

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
