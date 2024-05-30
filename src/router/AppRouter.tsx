import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PAGE_INFORMATION } from '../constants/page';

const router = createBrowserRouter(
  [
    {
      path: PAGE_INFORMATION.main.path,
      element: <App />,
      children: [],
    },
  ],
  { basename: '/react-shopping-products/dist' }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
