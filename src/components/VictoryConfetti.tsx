import {FC, ReactElement} from 'react';
import Confetti from 'react-confetti';
import {useWindowSize} from 'react-use';

const VictoryConfetti: FC = (): ReactElement => {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      gravity={0.1}
    />
  );
};

export default VictoryConfetti;
