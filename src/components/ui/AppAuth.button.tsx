import React, {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {Button} from '@/components/ui/button';
import {LogIn} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/Router';
import {useAuthorizationStore} from '@/store/hooks';

const AppAuthButton: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();

  return (
    <>
      {!authorizationStore.isAuth && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'default'}
              size="icon"
              className="shadow-md"
              title={'Authorization menu'}
            >
              <LogIn className={'h-[1.2rem] w-[1.2rem]'} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(ERouter.SIGN_IN)}>
              Sign in
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate(ERouter.SIGN_UP)}>
              Sign up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
});

export default AppAuthButton;
