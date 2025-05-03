import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { BaseLayout } from '@components/Navigation/BaseLayout';
import { DetailThread } from '@pages/Threads/DetailThread';
import { CreateThread } from '@pages/Threads/CreateThread';
import { ThreadList } from '@pages/Threads/ThreadList';
import { Leaderboards } from '@pages/Leaderboards';
import { Register } from '@pages/Auth/Register';
import { ServerError } from '@pages/Error/500';
import { NotFound } from '@pages/Error/404';
import { Login } from '@pages/Auth/Login';
import { useAuth } from '@utils/custom-hooks';
import { path } from '@utils/constants';
import { history } from '@utils/history';

function App() {
  const { isAuthenticated } = useAuth();

  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <BaseLayout>
      <Routes>
        <Route path={path.home} element={<ThreadList />} />
        <Route path={path.createThread} element={<CreateThread />} />
        <Route path={`${path.threads}/:id`} element={<DetailThread />} />
        <Route path={path.leaderboards} element={<Leaderboards />} />
        <Route
          path={path.login}
          element={
            isAuthenticated ? <Navigate to={path.home} replace /> : <Login />
          }
        />
        <Route
          path={path.register}
          element={
            isAuthenticated ? <Navigate to={path.home} replace /> : <Register />
          }
        />
        <Route path={path.serverError} element={<ServerError />} />
        <Route path={path.notFound} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BaseLayout>
  );
}

export default App;
