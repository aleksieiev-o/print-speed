import {useEffect, useRef} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
