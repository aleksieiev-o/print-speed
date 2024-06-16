import {FC, ReactElement} from 'react';
import {ERouter} from '@/shared/Router';
import {Link} from 'react-router-dom';

interface Props {
  to: ERouter;
  title: string;
}

const AppNavigationLink: FC<Props> = (props): ReactElement => {
  const {to, title} = props;

  return (
    <Link
      to={to}
      title={title}
      className={
        'p-4 font-md rounded-lg hover:bg-primary hover:text-secondary duration-400 ease-in-out'
      }
    >
      {title}
    </Link>
  );
};

export default AppNavigationLink;
