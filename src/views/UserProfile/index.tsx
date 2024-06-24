import {FC, ReactElement, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import AppWrapper from '@/components/AppWrapper';
import UserProfileInfo from '@/views/UserProfile/UserProfileInfo';
import UserProfileSignOut from '@/views/UserProfile/UserProfileSignOut';
import ChangeDisplayNameDialog from './ChangeDisplayName.dialog';
import ChangeEmailDialog from './ChangeEmail.dialog';
import ChangePasswordDialog from './ChangePassword.dialog';
import {observer} from 'mobx-react-lite';
import {useAuthorizationStore} from '@/store/hooks';
import {DEFAULT_USER_DN} from '@/shared/appConstants';

const UserProfile: FC = observer((): ReactElement => {
  const [dialogIsOpenChangeDisplayName, setDialogIsOpenChangeDisplayName] = useState<boolean>(false);
  const [dialogIsOpenChangeEmail, setDialogIsOpenChangeEmail] = useState<boolean>(false);
  const [dialogIsOpenChangePassword, setDialogIsOpenChangePassword] = useState<boolean>(false);
  const authorizationStore = useAuthorizationStore();

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent className={'w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto'}>
          <UserProfileInfo itemTitle={'User ID:'} itemValue={authorizationStore.user?.uid || ''} withActionButton={false} />

          <UserProfileInfo
            handleClick={() => setDialogIsOpenChangeDisplayName(true)}
            itemTitle={'Display name:'}
            itemValue={authorizationStore.user?.displayName || DEFAULT_USER_DN}
            withActionButton={true}
            buttonTitle={'Change display name'}
            buttonValue={'Change display name'}
          />

          <UserProfileInfo
            handleClick={() => setDialogIsOpenChangeEmail(true)}
            itemTitle={'Email:'}
            itemValue={authorizationStore.user?.email || ''}
            withActionButton={true}
            buttonTitle={'Change email'}
            buttonValue={'Change email'}
          />

          <UserProfileInfo
            handleClick={() => setDialogIsOpenChangePassword(true)}
            itemTitle={'Password:'}
            itemValue={'******'}
            withActionButton={true}
            buttonTitle={'Change password'}
            buttonValue={'Change password'}
          />

          <UserProfileSignOut />
        </CardContent>
      </Card>

      <ChangeDisplayNameDialog setDialogIsOpen={setDialogIsOpenChangeDisplayName} dialogIsOpen={dialogIsOpenChangeDisplayName} />

      <ChangeEmailDialog setDialogIsOpen={setDialogIsOpenChangeEmail} dialogIsOpen={dialogIsOpenChangeEmail} />

      <ChangePasswordDialog setDialogIsOpen={setDialogIsOpenChangePassword} dialogIsOpen={dialogIsOpenChangePassword} />
    </AppWrapper>
  );
});

export default UserProfile;
