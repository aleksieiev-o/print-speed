import {FC, ReactElement, useState} from 'react';
import {CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {MoreVertical} from 'lucide-react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import AppAvatar from '@/components/AppAvatar';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/shared/Router';
import SignOutConfirmDialog from '../SignOutConfirm.dialog';
import {DEFAULT_USER_DN} from '@/shared/appConstants';
import {useSignOut} from '@/shared/hooks/useSignOut';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

const AppNavigationFooter: FC = observer((): ReactElement => {
  const navigate = useNavigate();
  const {signOutLoading} = useSignOut();
  const [dialogIsOpenSignOut, setDialogIsOpenSignOut] = useState<boolean>(false);
  const authorizationStore = useAuthorizationStore();

  return (
    <>
      {authorizationStore.user && (
        <CardFooter className={'w-full grid grid-cols-[56px_1fr_48px] gap-2 overflow-hidden'}>
          <AppAvatar handleClick={() => navigate(ERouter.USER_PROFILE)} userImageSrc={''} userName={authorizationStore.user.displayName || DEFAULT_USER_DN} />

          <div className={'w-full flex flex-col items-start justify-start overflow-hidden'}>
            <span className={'w-full whitespace-nowrap text-ellipsis font-bold overflow-hidden'} title={authorizationStore.user.displayName || DEFAULT_USER_DN}>
              {authorizationStore.user.displayName || DEFAULT_USER_DN}
            </span>

            <span className={'w-full whitespace-nowrap text-ellipsis overflow-hidden'} title={authorizationStore.user.email || 'User email'}>
              {authorizationStore.user.email || 'User email'}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size={'icon'} className={''} title={'User menu'} disabled={signOutLoading}>
                <MoreVertical className={'h-[1.2rem] w-[1.2rem]'} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(ERouter.USER_PROFILE)} title={'User settings'}>
                User settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setDialogIsOpenSignOut(true)} disabled={signOutLoading} title={'Sign out'}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      )}

      <SignOutConfirmDialog setDialogIsOpen={setDialogIsOpenSignOut} dialogIsOpen={dialogIsOpenSignOut} />
    </>
  );
});

export default AppNavigationFooter;
