import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@app/core/Redux/hooks';
import { ROUTES } from '@app/core/types/constants';

const PrivateLayout = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
