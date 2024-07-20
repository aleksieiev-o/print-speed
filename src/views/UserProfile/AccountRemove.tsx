import {Button} from '@/components/ui/button';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {Loader2, UserX} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import {FC, ReactElement, useState} from 'react';
import {useDeleteUser} from 'react-firebase-hooks/auth';
import {useSignOut} from '@/shared/hooks/useSignOut';
import {firebaseAuth} from '@/lib/firebase/firebase';

const AccountRemove: FC = observer((): ReactElement => {
  const {signOut, signOutLoading} = useSignOut();
  const [deleteUser, userRemoveLoading] = useDeleteUser(firebaseAuth);
  const [dialogIsOpenUserRemove, setDialogIsOpenUserRemove] = useState<boolean>(false);

  const removeUser = async () => {
    try {
      await deleteUser();
      await signOut();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <div className={'w-full flex items-center justify-start 2md:justify-end'}>
        <Button
          onClick={() => setDialogIsOpenUserRemove(true)}
          variant={'destructive'}
          title={'Remove account'}
          disabled={signOutLoading}
          className={'min-w-[200px] lg:min-w-[240px]'}
        >
          {signOutLoading || userRemoveLoading ? (
            <>
              <Loader2 className={'mr-4 h-5 w-5 animate-spin'} />
              <span>Please wait</span>
            </>
          ) : (
            <>
              <UserX className={'mr-4 h-5 w-5'} />
              <span>Remove account</span>
            </>
          )}
        </Button>
      </div>

      <RemoveConfirmDialog
        dialogIsOpen={dialogIsOpenUserRemove}
        setDialogIsOpen={setDialogIsOpenUserRemove}
        handleAction={async () => await removeUser()}
        dialogTitle={'Remove account confirmation'}
        dialogDescription={'You are about to remove this account.'}
        dialogQuestion={'Are you sure you want to remove this account?'}
        btnTitle={'Remove account'}
        btnBody={'Remove'}
        successCallbackDesc="Your account has successfully removed."
      />
    </>
  );
});

export default AccountRemove;
