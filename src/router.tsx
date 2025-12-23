import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@app/core/layouts';
import { privateRoutes, publicRoutes } from '@app/core/routes';
import { NotFound } from '@app/pages';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);

export default router;
