import {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {CardDescription} from '@/components/ui/card';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import {EFinishGameStatus, EGameActiveStatus} from '@/store/GameStore/types';
import {Alert, AlertDescription, AlertTitle, EAlertVariant} from '@/components/ui/alert';
import {Hourglass} from 'lucide-react';

enum ERemainedTime {
  MUCH = 1,
  ENOUGH = 0.7,
  LITTLE = 0.2,
}

const Timer: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const remainedTime = useMemo((): ERemainedTime => {
    if (time <= gameStore.textPrintTime * ERemainedTime.LITTLE) {
      return ERemainedTime.LITTLE;
    } else if (time <= gameStore.textPrintTime * ERemainedTime.ENOUGH) {
      return ERemainedTime.ENOUGH;
    }
    return ERemainedTime.MUCH;
  }, [gameStore.textPrintTime, time]);

  const remainedTimeAlertVariant = useMemo((): string => {
    return {
      [ERemainedTime.LITTLE]: EAlertVariant.DANGER,
      [ERemainedTime.ENOUGH]: EAlertVariant.WARNING,
      [ERemainedTime.MUCH]: EAlertVariant.SUCCESS,
    }[remainedTime];
  }, [remainedTime]);

  const isSpinAnimate = useMemo((): string => {
    return gameStore.isGameRunning
    ? 'animate-spin-180deg' : '';
  }, [gameStore.isGameRunning]);

  useEffect(() => {
    setTime(gameStore.textPrintTime);
  }, [gameStore.text.body, gameStore.textPrintTime]);

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
    if (time === 0 && (gameStore.isGameRunning)) {
      gameStore.changeGameActiveStatus(EGameActiveStatus.STOPPED);
      gameStore.changeGameFinishStatus(EFinishGameStatus.FAILURE);
      setTime(gameStore.textPrintTime);
    }
  }, [gameStore.text.body, gameStore.textPrintTime, gameStore, time]);

  useEffect(() => {
    switch (gameStore.gameActiveStatus) {
      case EGameActiveStatus.STARTED: setIsRunning(true); break;
      case EGameActiveStatus.RESUMED: setIsRunning(true); break;
      case EGameActiveStatus.PAUSED: setIsRunning(false); break;
      case EGameActiveStatus.STOPPED: setIsRunning(false); break;
      default: break;
    }
  }, [gameStore.gameActiveStatus]);

  return (
    <Alert variant={!gameStore.isGameStopped ? remainedTimeAlertVariant : EAlertVariant.DEFAULT}>
      {
        !gameStore.isGameStopped
        && <AlertTitle className={'mb-2'}>
          <Hourglass className={`h-8 w-8 ${isSpinAnimate}`}/>
        </AlertTitle>
      }

      <AlertDescription>
        <CardDescription className={'flex gap-2 text-md text-foreground'}>
          {
            gameStore.isGameStopped ?
              <span>Text print time:</span>
              :
              <span>Remaining print time:</span>
          }

          {
            gameStore.isGameStopped ?
              <span>{gameStore.textPrintTime} sec.</span>
              :
              <span>{time} sec.</span>
          }
        </CardDescription>
      </AlertDescription>
    </Alert>
  );
});

export default Timer;
