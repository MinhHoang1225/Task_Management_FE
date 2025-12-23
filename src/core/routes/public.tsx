import { PublicLayout } from '../layouts';
import AuthLayout from '../layouts/AuthLayout';
import { ROUTES } from '../types/constants';
import { Home, Login, Register } from '@app/pages';

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default publicRoutes;
