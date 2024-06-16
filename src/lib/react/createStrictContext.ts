import {createContext} from 'react';

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}
