import {useRootStore} from '@/store/hooks';
import {useMemo} from 'react';

interface UseDesktopDevice {
  isNotDesktop: boolean;
}

export const useDesktopDevice = (): UseDesktopDevice => {
  const {bowserPlatform} = useRootStore();

  const isNotDesktop = useMemo((): boolean => bowserPlatform.type !== 'desktop', [bowserPlatform.type]);

  return {
    isNotDesktop,
  };
};
