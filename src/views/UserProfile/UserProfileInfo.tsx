import {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

interface Props {
  itemTitle: string;
  itemValue: string | null;
  withActionButton: boolean;
  buttonTitle?: string;
  buttonValue?: string;
  handleClick?: () => void;
}

const UserProfileInfo: FC<Props> = observer((props): ReactElement => {
  const {itemTitle, itemValue, withActionButton, buttonTitle, buttonValue, handleClick} = props;
  const authorizationStore = useAuthorizationStore();

  return (
    <div className={'w-full flex flex-col 2md:flex-row gap-6 items-start 2md:items-center justify-start overflow-hidden'}>
      <div className={'w-full flex flex-row flex-row-nowrap gap-4 items-center justify-start overflow-hidden'}>
        <h6 className={'lg:min-w-[150px] whitespace-nowrap'}>{itemTitle}</h6>

        {authorizationStore.userLoading ? (
          <Skeleton className={'h-5 w-[180px] bg-white/50'} />
        ) : (
          <span className={'font-bold whitespace-nowrap text-ellipsis overflow-hidden'}>{itemValue}</span>
        )}
      </div>

      {withActionButton && (
        <>
          {authorizationStore.userLoading ? (
            <Skeleton className={'h-12 min-w-[200px] lg:min-w-[240px] bg-white/50'} />
          ) : (
            <Button onClick={handleClick} variant={'default'} title={buttonTitle} className={'min-w-[200px] lg:min-w-[240px]'}>
              {buttonValue}
            </Button>
          )}
        </>
      )}
    </div>
  );
});

export default UserProfileInfo;
