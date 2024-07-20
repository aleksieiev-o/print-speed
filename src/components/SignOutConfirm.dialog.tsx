import {FC, ReactElement} from 'react';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {useToast} from './ui/use-toast';
import {Button} from './ui/button';
import {useSignOut} from '@/shared/hooks/useSignOut';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const SignOutConfirmDialog: FC<Props> = (props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {signOut, signOutLoading} = useSignOut();

  const handleConfirm = async (): Promise<void> => {
    try {
      await signOut();

      toast({title: 'Success', description: 'You signed out successfully.'});
    } catch (e) {
      toast({
        title: 'Failure',
        description: 'An error has occurred. Something went wrong.',
        variant: 'destructive',
      });
      console.warn(e);
    } finally {
      setDialogIsOpen(false);
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Sign out confirmation</DialogTitle>

          <DialogDescription>You are about to sign out.</DialogDescription>
        </DialogHeader>

        <p>Are you sure you want to sign out?</p>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Button onClick={handleConfirm} disabled={signOutLoading} variant={'default'} title={'Sign out'}>
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutConfirmDialog;
