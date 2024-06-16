import {FC, ReactElement} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import AppWrapper from '@/components/AppWrapper';
import {observer} from 'mobx-react-lite';
import {useAuthorizationStore} from '@/store/hooks';
import UserProfileInfo from '@/views/UserProfile/UserProfileInfo';
import UserProfileSignOut from '@/views/UserProfile/UserProfileSignOut';

const UserProfile: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent
          className={
            'w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto'
          }
        >
          <UserProfileInfo
            itemTitle={'User ID:'}
            itemValue={authorizationStore.userUid}
            witchActionButton={false}
          />

          <UserProfileInfo
            handleClick={() => undefined}
            itemTitle={'Display name:'}
            itemValue={
              authorizationStore.user.displayName ||
              authorizationStore.defaultDisplayName
            }
            witchActionButton={true}
            buttonTitle={'Change display name'}
            buttonValue={'Change display name'}
          />

          <UserProfileInfo
            handleClick={() => undefined}
            itemTitle={'Email:'}
            itemValue={authorizationStore.user.email}
            witchActionButton={true}
            buttonTitle={'Change email'}
            buttonValue={'Change email'}
          />

          <UserProfileInfo
            itemTitle={'Password:'}
            itemValue={'*********'}
            witchActionButton={true}
            buttonTitle={'Change password'}
            buttonValue={'Change password'}
          />

          <UserProfileSignOut />
        </CardContent>
      </Card>
    </AppWrapper>
  );
});

export default UserProfile;
