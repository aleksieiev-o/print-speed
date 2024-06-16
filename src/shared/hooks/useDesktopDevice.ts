import {useRootStore} from '@/store/hooks';
import {useMemo} from 'react';

interface UseDesktopDevice {
  IsNotDesktop: boolean;
}

export const useDesktopDevice = (): UseDesktopDevice => {
  const {bowserPlatform} = useRootStore();

  const IsNotDesktop = useMemo(
    (): boolean => bowserPlatform.type !== 'desktop',
    [bowserPlatform.type],
  );

  return {
    IsNotDesktop,
  };
};
