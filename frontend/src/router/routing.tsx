import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Navigate } from 'react-router-dom';
import ListDashboard from '../pages/ListDashboard';
import Profile from '../pages/Profile';
import SwitchPassword from '../pages/SwitchPassword';

interface IRouter {
	path: string;
	element: React.ReactNode;
}

export const publicRoutes: Array<IRouter> = [
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/switchPassword', element: <SwitchPassword /> },
	{ path: '*', element: <Navigate to="/login" replace /> },
];

export const userRoutes: Array<IRouter> = [
	{ path: '/myLists', element: <ListDashboard /> },
	{ path: '/profile', element: <Profile /> },
	{ path: '*', element: <Navigate to="/myLists" replace /> },
];
