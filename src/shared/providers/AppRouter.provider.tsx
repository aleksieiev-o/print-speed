import {FC, ReactElement} from 'react';
import {RouterProvider} from 'react-router-dom';
import {fullRouter, baseRouter} from '../Router';
import {useDesktopDevice} from '../hooks/useDesktopDevice';

const AppRouterProvider: FC = (): ReactElement => {
  const {isNotDesktop} = useDesktopDevice();

  return <RouterProvider router={isNotDesktop ? baseRouter : fullRouter} />;
};

export default AppRouterProvider;
