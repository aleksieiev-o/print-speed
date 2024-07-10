import {createContext, FC, PropsWithChildren, ReactElement, useState, useMemo} from 'react';

interface VictoryConfettiState {
  isConfettiStarted: boolean;
  setConfettiStarted: (status: boolean) => void;
}

const initialState: VictoryConfettiState = {
  isConfettiStarted: false,
  setConfettiStarted: () => undefined,
};

export const VictoryConfettiContext = createContext<VictoryConfettiState>(initialState);

const VictoryConfettiProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
  const [confettiRun, setConfettiRun] = useState<boolean>(false);
  const [confettiRecycle, setConfettiRecycle] = useState<boolean>(false);

  const isConfettiStarted = useMemo(() => confettiRun && confettiRecycle, [confettiRecycle, confettiRun]);

  const setConfettiStarted = (status: boolean): void => {
    setConfettiRun(status);
    setConfettiRecycle(status);
  };

  const value: VictoryConfettiState = {
    isConfettiStarted,
    setConfettiStarted,
  };

  return <VictoryConfettiContext.Provider value={value}>{children}</VictoryConfettiContext.Provider>;
};

export default VictoryConfettiProvider;
