import {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {Loader2, LogOut} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import {useSignOut} from '@/hooks/useSignOut';

const UserProfileSignOut: FC = observer((): ReactElement => {
  const {isLoading, handleSignOut} = useSignOut();

  return (
    <div className={'w-full flex items-center justify-start 2md:justify-end'}>
      <Button
        onClick={handleSignOut}
        variant={'default'}
        title={'Sign out'}
        disabled={isLoading}
        className={'min-w-[200px] lg:min-w-[240px]'}
      >
        {isLoading ? (
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
  );
});

export default UserProfileSignOut;
