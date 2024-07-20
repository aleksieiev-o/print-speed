import {FC, ReactElement} from 'react';
import {RefreshCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useGameStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {useElementFocus} from '@/shared/hooks/useElementFocus';

const ChangeTextButton: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {elementRef, removeFocus} = useElementFocus<HTMLButtonElement>();

  const handleChangeText = () => {
    gameStore.changeText();
    removeFocus();
  };

  return (
    <Button onClick={() => handleChangeText()} ref={elementRef} variant={'default'} title={'Set random text'} className="min-w-[200px] xl:min-w-[240px]">
      <RefreshCw className={'mr-4 h-5 w-5'} />

      <span>Set random text</span>
    </Button>
  );
});

export default ChangeTextButton;
