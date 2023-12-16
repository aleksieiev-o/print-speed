import {FC, ReactElement, useCallback, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {EGameActiveStatus} from '@/store/GameStore/types';
import {Pause, Play} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useGameStore} from '@/store/hooks';
import {action} from 'mobx';

const ChangeGameStatusButton: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  const runGame = useCallback(() => {
    return gameStore.gameStoreService.changeGameActiveStatus(EGameActiveStatus.ACTIVE);
  }, [gameStore.gameStoreService]);

  const pauseGame = useCallback(() => {
    return gameStore.gameStoreService.changeGameActiveStatus(EGameActiveStatus.PAUSED);
  }, [gameStore.gameStoreService]);

  const resumeGame = useCallback(() => {
    return gameStore.gameStoreService.changeGameActiveStatus(EGameActiveStatus.ACTIVE);
  }, [gameStore.gameStoreService]);

  const buttonBody = useMemo(() => {
    return {
      [EGameActiveStatus.STOPPED]: {
        title: 'Run the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => runGame()),
      },
      [EGameActiveStatus.ACTIVE]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => pauseGame()),
      },
      [EGameActiveStatus.PAUSED]: {
        title: 'Resume the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => resumeGame()),
      }
    }[gameStore.gameActiveStatus];
  }, [gameStore.gameActiveStatus, pauseGame, resumeGame, runGame]);

  return (
    <Button onClick={buttonBody.handle} variant={'default'} title={buttonBody.title}>
      {buttonBody.icon}
      {buttonBody.title}
    </Button>
  );
});

export default ChangeGameStatusButton;
