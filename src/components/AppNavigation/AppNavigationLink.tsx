import {FC, ReactElement} from 'react';
import {ERouter} from '@/shared/Router';
import {NavLink} from 'react-router-dom';
import {LucideIcon} from 'lucide-react';

interface Props {
  to: ERouter;
  title: string;
  Icon: LucideIcon;
}

const AppNavigationLink: FC<Props> = (props): ReactElement => {
  const {to, title, Icon} = props;
  const defaultNavLinkClasses = 'p-4 font-md rounded-lg hover:bg-primary hover:text-secondary duration-400 ease-in-out';

  return (
    <NavLink to={to} title={title} className={({isActive}) => [isActive ? `${defaultNavLinkClasses} bg-primary text-secondary` : defaultNavLinkClasses].join(' ')}>
      <div className="flex flex-row flex-nowrap items-center justify-start">
        <Icon className="mr-4 h-5 w-5" />

        <span>{title}</span>
      </div>
    </NavLink>
  );
};

export default AppNavigationLink;
