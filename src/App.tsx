import { 
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { SignUpLayout } from './layouts/SignUpLayout/SignUpLayout';
import { Routes } from './routes';


const router = createBrowserRouter([
  {
    path: Routes.Auth,
    element: <SignUpLayout />
  },
  {
    path: Routes.Home,
    element: <MainLayout />,
    children: [
      {
        path: Routes.Home,
        element: <Navigate to={Routes.Dashboard} replace />
      },
      {
        path: Routes.Dashboard,
        element: <Dashboard />
      }
    ]
  }
]);

const theme = createTheme();

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
