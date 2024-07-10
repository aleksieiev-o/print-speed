import {FC, ReactElement} from 'react';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useLoading} from '@/shared/hooks/useLoading';
import {useToast} from '@/components/ui/use-toast';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  handleAction: (prop?: string) => Promise<void>;
  dialogTitle: string;
  dialogDescription: string;
  dialogQuestion: string;
  btnTitle: string;
  btnBody: string;
  successCallbackDesc: string;
}

const RemoveConfirmDialog: FC<Props> = (props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen, handleAction, dialogDescription, dialogQuestion, dialogTitle, btnTitle, btnBody, successCallbackDesc} = props;
  const {isLoading, setIsLoading} = useLoading();
  const {toast} = useToast();

  const onSuccessCallback = async (): Promise<void> => {
    toast({
      title: 'Success',
      description: successCallbackDesc,
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
      await handleAction();
      await onSuccessCallback();
    } catch (err) {
      await onErrorCallback();
      console.warn(err);
    } finally {
      await onSettledCallback();
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>

          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <p>{dialogQuestion}</p>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Button onClick={handleConfirm} disabled={isLoading} variant={'destructive'} title={btnTitle}>
            {btnBody}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveConfirmDialog;
