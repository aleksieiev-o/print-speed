import {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {CardDescription} from '@/components/ui/card';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import {EFinishGameStatus, EGameActiveStatus} from '@/store/GameStore/types';
import {Alert, AlertDescription, AlertTitle, EAlertVariant} from '@/components/ui/alert';
import {Hourglass} from 'lucide-react';
import {useIsGameActive} from '@/shared/hooks/useIsGameActive';
import {Skeleton} from '@/components/ui/skeleton';

enum ERemainedTime {
  MUCH = 1,
  ENOUGH = 0.7,
  LITTLE = 0.2,
}

const defaultPreparingTime = 2;

const Timer: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const [time, setTime] = useState<number>(0);
  const [preparingTime, setPreparingTime] = useState<number>(defaultPreparingTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const {isGameActive} = useIsGameActive();

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
    return gameStore.isGameRunning ? 'animate-spin-180deg' : '';
  }, [gameStore.isGameRunning]);

  useEffect(() => {
    setTime(gameStore.textPrintTime);
    setPreparingTime(defaultPreparingTime);
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
    if (time === 0 && gameStore.isGameRunning) {
      gameStore.changeGameActiveStatus(EGameActiveStatus.STOPPED);
      gameStore.changeGameFinishStatus(EFinishGameStatus.FAILURE);
      setTime(gameStore.textPrintTime);
    }
  }, [gameStore.text.body, gameStore.textPrintTime, gameStore, time]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStore.isGamePreparing && preparingTime >= 0) {
      timer = setInterval(() => {
        setPreparingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);

      if (preparingTime === 0) {
        setPreparingTime(defaultPreparingTime);
        gameStore.changeGameActiveStatus(EGameActiveStatus.STARTED);
      }
    };
  }, [gameStore, gameStore.isGamePreparing, preparingTime]);

  useEffect(() => {
    switch (gameStore.gameActiveStatus) {
      case EGameActiveStatus.STARTED:
        setIsRunning(true);
        break;
      case EGameActiveStatus.RESUMED:
        setIsRunning(true);
        break;
      case EGameActiveStatus.PAUSED:
        setIsRunning(false);
        break;
      case EGameActiveStatus.STOPPED:
        setIsRunning(false);
        break;
      default:
        break;
    }
  }, [gameStore.gameActiveStatus]);

  return (
    <>
      {gameStore.text.body ? (
        <Alert variant={isGameActive ? (remainedTimeAlertVariant as EAlertVariant) : EAlertVariant.DEFAULT}>
          {isGameActive && (
            <AlertTitle className={'mb-2'}>
              <Hourglass className={`h-8 w-8 ${isSpinAnimate}`} />
            </AlertTitle>
          )}

          <AlertDescription>
            <CardDescription className={'flex gap-2 text-md text-foreground'}>
              {gameStore.isGamePreparing ? <span>Time to start:</span> : <>{isGameActive ? <span>Remaining print time:</span> : <span>Text print time:</span>}</>}

              {gameStore.isGamePreparing ? <strong>{preparingTime} sec.</strong> : <>{isGameActive ? <span>{time} sec.</span> : <span>{gameStore.textPrintTime} sec.</span>}</>}
            </CardDescription>
          </AlertDescription>
        </Alert>
      ) : (
        <Skeleton className={'h-12 w-full bg-white/50'} />
      )}
    </>
  );
});

export default Timer;
