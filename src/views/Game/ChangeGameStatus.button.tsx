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
        icon: <Play className={'mr-4 h-5 w-5'} />,
        newStatus: EGameActiveStatus.PREPARING,
        isDisabled: false,
      },
      [EGameActiveStatus.STARTED]: {
        title: 'Pause the game',
        icon: <Pause className={'mr-4 h-5 w-5'} />,
        newStatus: EGameActiveStatus.PAUSED,
        isDisabled: false,
      },
      [EGameActiveStatus.PAUSED]: {
        title: 'Resume the game',
        icon: <Play className={'mr-4 h-5 w-5'} />,
        newStatus: EGameActiveStatus.RESUMED,
        isDisabled: false,
      },
      [EGameActiveStatus.RESUMED]: {
        title: 'Pause the game',
        icon: <Pause className={'mr-4 h-5 w-5'} />,
        newStatus: EGameActiveStatus.PAUSED,
        isDisabled: false,
      },
      [EGameActiveStatus.PREPARING]: {
        title: 'Preparing the game',
        icon: <Loader2 className={'mr-4 h-5 w-5 animate-spin'} />,
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
      className="min-w-[200px] xl:min-w-[240px]"
    >
      {buttonBody.icon}

      <span>{buttonBody.title}</span>
    </Button>
  );
});

export default ChangeGameStatusButton;
