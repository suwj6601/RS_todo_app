import React, { ComponentType, lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { ROUTES } from 'src/constants/routes';
import TodoListPage from 'src/pages/TodoList';

function Loadable<T extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithTheme: React.FC<T> = (props) => {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
  ComponentWithTheme.displayName = `withLoadable(${displayName})`;

  return ComponentWithTheme;
}

const LandingPage = Loadable(lazy(() => import('src/pages/LandingPage')));
const LoginPage = Loadable(lazy(() => import('src/pages/Login')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <LandingPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.TODOLIST,
    element: <TodoListPage />,
  },
];

export default function MainRouter() {
  return useRoutes(routes);
}
