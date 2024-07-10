import {VictoryConfettiContext} from '@/shared/providers/VictoryConfetti.provider';
import {FC, ReactElement, useContext, useEffect} from 'react';
import Confetti from 'react-confetti';
import {useWindowSize} from 'react-use';

const VictoryConfetti: FC = (): ReactElement => {
  const {width, height} = useWindowSize();
  const {isConfettiStarted, setConfettiStarted} = useContext(VictoryConfettiContext);

  useEffect(() => {
    if (isConfettiStarted) {
      setTimeout(() => {
        setConfettiStarted(false);
      }, 7000);
    }
  }, [isConfettiStarted, setConfettiStarted]);

  return <Confetti width={width} height={height} gravity={0.1} recycle={isConfettiStarted} run={isConfettiStarted} />;
};

export default VictoryConfetti;
