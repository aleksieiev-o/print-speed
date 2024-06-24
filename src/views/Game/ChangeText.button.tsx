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
    <Button onClick={() => handleChangeText()} ref={elementRef} variant={'default'} title={'Set another text'}>
      <RefreshCw className={'w-4 h-4 mr-2'} />
      Set another text
    </Button>
  );
});

export default ChangeTextButton;
