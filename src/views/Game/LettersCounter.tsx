import {FC, ReactElement} from 'react';

interface Props {
  remainingLettersQuantity: number;
  allLettersQuantity: number;
}

const LettersCounter: FC<Props> = (props): ReactElement => {
  const {remainingLettersQuantity, allLettersQuantity} = props;

  return (
    <div className={'flex gap-2'}>
      <span>
        Letters and signs left:
      </span>

      <strong>
        {remainingLettersQuantity}
      </strong>

      <span>
        from
      </span>

      <strong>
        {allLettersQuantity}
      </strong>
    </div>
  );
};

export default LettersCounter;
