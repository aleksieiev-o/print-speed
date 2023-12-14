import React, {FC, ReactElement} from 'react';

interface Props {
  victoryQuantity: number;
}

const VictoryCounter: FC<Props> = (props): ReactElement => {
  const {victoryQuantity} = props;

  return (
    <div className={'flex gap-2'}>
      <span>
        Victory:
      </span>

      <span>
        {victoryQuantity}
      </span>
    </div>
  );
};

export default VictoryCounter;
