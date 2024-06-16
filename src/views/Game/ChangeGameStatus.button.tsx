import {FC, ReactElement, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {EGameActiveStatus} from '@/store/GameStore/types';
import {Loader2, Pause, Play} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useGameStore} from '@/store/hooks';
import {useElementFocus} from '@/shared/hooks/useElementFocus';

interface IChangeActiveButton {
  title: string;
  icon: ReactElement;
  newStatus: EGameActiveStatus;
  isDisabled: boolean;
}

const ChangeGameStatusButton: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {elementRef, removeFocus} = useElementFocus<HTMLButtonElement>();

  const handleChangeGameActiveStatus = (newStatus: EGameActiveStatus) => {
    gameStore.changeGameActiveStatus(newStatus);
    removeFocus();
  };

  const buttonBody = useMemo<IChangeActiveButton>(() => {
    return {
      [EGameActiveStatus.STOPPED]: {
        title: 'Run the game',
        icon: <Play className={'w-4 h-4 mr-2'} />,
        newStatus: EGameActiveStatus.PREPARING,
        isDisabled: false,
      },
      [EGameActiveStatus.STARTED]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'} />,
        newStatus: EGameActiveStatus.PAUSED,
        isDisabled: false,
      },
      [EGameActiveStatus.PAUSED]: {
        title: 'Resume the game',
        icon: <Play className={'w-4 h-4 mr-2'} />,
        newStatus: EGameActiveStatus.RESUMED,
        isDisabled: false,
      },
      [EGameActiveStatus.RESUMED]: {
        title: 'Pause the game',
        icon: <Pause className={'w-4 h-4 mr-2'} />,
        newStatus: EGameActiveStatus.PAUSED,
        isDisabled: false,
      },
      [EGameActiveStatus.PREPARING]: {
        title: 'Preparing the game',
        icon: <Loader2 className={'h-4 w-4 mr-2 animate-spin'} />,
        newStatus: EGameActiveStatus.PREPARING,
        isDisabled: true,
      },
    }[gameStore.gameActiveStatus];
  }, [gameStore.gameActiveStatus]);

  return (
    <Button
      onClick={() => handleChangeGameActiveStatus(buttonBody.newStatus)}
      ref={elementRef}
      variant={'default'}
      disabled={buttonBody.isDisabled}
      title={buttonBody.title}
    >
      {buttonBody.icon}
      {buttonBody.title}
    </Button>
  );
});

export default ChangeGameStatusButton;
