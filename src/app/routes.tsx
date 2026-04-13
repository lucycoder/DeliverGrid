import { createBrowserRouter, Navigate } from 'react-router';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Packages from './pages/Packages';
import RouteOptimization from './pages/RouteOptimization';
import DeliveryMonitoring from './pages/DeliveryMonitoring';
import Complaints from './pages/Complaints';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        path: 'routes',
        element: <RouteOptimization />,
      },
      {
        path: 'monitoring',
        element: <DeliveryMonitoring />,
      },
      {
        path: 'complaints',
        element: <Complaints />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
