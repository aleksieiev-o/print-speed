import {MutableRefObject, useRef} from 'react';

interface IUseBlur<T> {
  elementRef: MutableRefObject<T | null>;
  setFocus: () => void;
  removeFocus: () => void;
}

export const useElementFocus = <T extends HTMLElement>(): IUseBlur<T> => {
  const elementRef = useRef<T | null>(null);

  const setFocus = (): void => {
    elementRef.current?.focus();
  };

  const removeFocus = (): void => {
    elementRef.current?.blur();
  };

  return {
    elementRef,
    setFocus,
    removeFocus,
  };
};
