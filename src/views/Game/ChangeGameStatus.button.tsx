import {FC, ReactElement, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {EGameActiveStatus} from '@/store/GameStore/types';
import {Pause, Play} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useGameStore} from '@/store/hooks';
import {useElementFocus} from '@/hooks/useElementFocus';

const ChangeGameStatusButton: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {elementRef, removeFocus} = useElementFocus<HTMLButtonElement>();

  const handleChangeGameActiveStatus = (newStatus: EGameActiveStatus) => {
    gameStore.changeGameActiveStatus(newStatus);
    removeFocus();
  };

  const buttonBody = useMemo(() => {
    return {
      [EGameActiveStatus.STOPPED]: {
        title: 'Run the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        newStatus: EGameActiveStatus.ACTIVE,
      },
      [EGameActiveStatus.ACTIVE]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'}/>,
        newStatus: EGameActiveStatus.PAUSED,
      },
      [EGameActiveStatus.PAUSED]: {
        title: 'Resume the game',
        icon: <Play className={'w-4 h-4 mr-2'}/>,
        newStatus: EGameActiveStatus.RESUMED,
      },
      [EGameActiveStatus.RESUMED]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'}/>,
        newStatus: EGameActiveStatus.PAUSED,
      },
    }[gameStore.gameActiveStatus];
  }, [gameStore.gameActiveStatus]);

  return (
    <Button
      onClick={() => handleChangeGameActiveStatus(buttonBody.newStatus)}
      ref={elementRef}
      variant={'default'}
      title={buttonBody.title}>
      {buttonBody.icon}
      {buttonBody.title}
    </Button>
  );
});

export default ChangeGameStatusButton;
