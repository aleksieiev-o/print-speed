import {FC, ReactElement, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {EGameActiveStatus} from '@/store/GameStore/types';
import {Pause, Play} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useGameStore} from '@/store/hooks';
import {action} from 'mobx';

const ChangeGameStatusButton: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  const buttonBody = useMemo(() => {
    return {
      [EGameActiveStatus.STOPPED]: {
        title: 'Run the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => gameStore.changeGameActiveStatus(EGameActiveStatus.ACTIVE)),
      },
      [EGameActiveStatus.ACTIVE]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => gameStore.changeGameActiveStatus(EGameActiveStatus.PAUSED)),
      },
      [EGameActiveStatus.PAUSED]: {
        title: 'Resume the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        handle: action('changeGameActiveStatus', () => gameStore.changeGameActiveStatus(EGameActiveStatus.ACTIVE)),
      }
    }[gameStore.gameActiveStatus];
  }, [gameStore]); // TODO check necessary of gameStore dependency

  return (
    <Button onClick={buttonBody.handle} variant={'default'} title={buttonBody.title}>
      {buttonBody.icon}
      {buttonBody.title}
    </Button>
  );
});

export default ChangeGameStatusButton;