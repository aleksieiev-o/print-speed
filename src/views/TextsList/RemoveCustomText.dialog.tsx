import {FC, ReactElement} from 'react';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {IText} from '@/store/TextsStore/types';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {observer} from 'mobx-react-lite';
import {useTextsStore} from '@/store/hooks';

interface Props {
  text: IText;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveCustomTextDialog: FC<Props> = observer((props): ReactElement => {
  const {text, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const textsStore = useTextsStore();

  const onSuccessCallback = async (): Promise<void> => {
    toast({
      title: 'Success',
      description: 'The custom text has successfully removed.',
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
      await textsStore.removeCustomText(text.id);
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
      dialogTitle={'Remove custom text confirmation'}
      dialogDescription={'You are about to remove this custom text.'}
      dialogQuestion={'Are you sure you want to delete this custom text?'}
      btnTitle={'Remove custom text'}
      btnBody={'Remove'}
    />
  );
});

export default RemoveCustomTextDialog;
