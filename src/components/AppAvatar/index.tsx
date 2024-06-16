import React, {FC, ReactElement} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useInitials} from '@/components/AppAvatar/useInitials';

interface Props {
  userImageSrc: string | null;
  userName: string | null;
  handleClick?: () => void;
}

const AppAvatar: FC<Props> = (props): ReactElement => {
  const {userImageSrc, userName, handleClick} = props;
  const userInitials = useInitials(userName);

  return (
    <Avatar onClick={handleClick} className={'h-14 w-14 cursor-pointer'}>
      <AvatarImage src={userImageSrc || ''} />

      <AvatarFallback
        className={'text-primary-foreground text-xl font-bold'}
        aria-hidden={true}
      >
        {userInitials}
      </AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
