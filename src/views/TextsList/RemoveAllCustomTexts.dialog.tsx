import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useTextsStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {FC, ReactElement} from 'react';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveAllCustomTextsDialog: FC<Props> = observer((props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const textsStore = useTextsStore();

  const onSuccessCallback = async (): Promise<void> => {
    toast({
      title: 'Success',
      description: 'All custom texts have successfully removed.',
    });
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({
      title: 'Failure',
      description: 'An error has occurred. Something went wrong.',
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
    setDialogIsOpen(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await textsStore.removeAllCustomTexts();
      await onSuccessCallback();
    } catch (err) {
      await onErrorCallback();
      console.warn(err);
    } finally {
      await onSettledCallback();
    }
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove all custom texts confirmation'}
      dialogDescription={'You are about to remove all custom texts.'}
      dialogQuestion={'Are you sure you want to remove all custom texts?'}
      btnTitle={'Remove custom texts'}
      btnBody={'Remove'}
    />
  );
});

export default RemoveAllCustomTextsDialog;
