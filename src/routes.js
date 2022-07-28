import { useEffect } from "react";
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OTP from './pages/OTP';
import ResendOtp from './pages/ResendOtp';
import ChangePassword from './pages/ChangePassword';

import { getUser } from './Redux/Selectors/UserSelectors';
import GroopManagement from "./pages/GroopManagement";
import CreateGroup from "./pages/CreateGroup";
import UserListedGroup from "./pages/UserListedGroup";



// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector(getUser); 
  
  return useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to ="/login" />,
      children: [
        { path: 'app', element: <DashboardApp/> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'groop-management', element: <GroopManagement /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'create-group', element: <CreateGroup />},
        { path: 'user-listed-group', element: <UserListedGroup />}
      ],
    },
    {
      path: '/',
      element: !auth ? <LogoOnlyLayout /> : <Navigate to ="/dashboard/app" />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },        
        { path: 'otp', element: <OTP /> },
        { path: 'resend-otp', element: <ResendOtp /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}