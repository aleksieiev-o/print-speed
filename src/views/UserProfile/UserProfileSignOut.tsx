import {FC, ReactElement, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Loader2, LogOut} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import SignOutConfirmDialog from '@/components/SignOutConfirm.dialog';
import {useSignOut} from '@/shared/hooks/useSignOut';

const UserProfileSignOut: FC = observer((): ReactElement => {
  const {signOutLoading} = useSignOut();
  const [dialogIsOpenSignOut, setDialogIsOpenSignOut] =
    useState<boolean>(false);

  return (
    <>
      <div className={'w-full flex items-center justify-start 2md:justify-end'}>
        <Button
          onClick={() => setDialogIsOpenSignOut(true)}
          variant={'default'}
          title={'Sign out'}
          disabled={signOutLoading}
          className={'min-w-[200px] lg:min-w-[240px]'}
        >
          {signOutLoading ? (
            <>
              <Loader2 className={'h-4 w-4 mr-2 animate-spin'} />
              <span>Please wait</span>
            </>
          ) : (
            <>
              <LogOut className={'h-4 w-4 mr-2'} />
              <span>Sign out</span>
            </>
          )}
        </Button>
      </div>

      <SignOutConfirmDialog
        setDialogIsOpen={setDialogIsOpenSignOut}
        dialogIsOpen={dialogIsOpenSignOut}
      />
    </>
  );
});

export default UserProfileSignOut;
