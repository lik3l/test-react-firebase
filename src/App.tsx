import { 
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Routes } from './routes';


const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <MainLayout />
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
