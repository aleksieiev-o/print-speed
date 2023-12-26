import {FC, ReactElement, useEffect, useState} from 'react';
import {CardDescription} from '@/components/ui/card';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import {EGameActiveStatus} from '@/store/GameStore/types';

const Timer: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setTime(gameStore.textPrintTime);
  }, [gameStore.textPrintTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0 && (gameStore.gameActiveStatus === EGameActiveStatus.ACTIVE || gameStore.gameActiveStatus === EGameActiveStatus.RESUMED)) {
      gameStore.changeGameActiveStatus(EGameActiveStatus.STOPPED);
    }
  }, [gameStore, time]);

  useEffect(() => {
    switch (gameStore.gameActiveStatus) {
      case EGameActiveStatus.ACTIVE: setIsRunning(true); break;
      case EGameActiveStatus.RESUMED: setIsRunning(true); break;
      case EGameActiveStatus.PAUSED: setIsRunning(false); break;
      case EGameActiveStatus.STOPPED: setIsRunning(false); break;
      default: break;
    }
  }, [gameStore.gameActiveStatus]);

  return (
    <CardDescription className={'flex gap-2 text-md text-foreground'}>
      {
        gameStore.gameActiveStatus === EGameActiveStatus.STOPPED ?
          <span>Text print time:</span>
          :
          <span>Remaining print time:</span>
      }

      {
        gameStore.gameActiveStatus === EGameActiveStatus.STOPPED ?
          <span>{gameStore.textPrintTime} sec.</span>
          :
          <span>{time} sec.</span>
      }
    </CardDescription>
  );
});

export default Timer;
