import React from "react"
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Navigate } from "react-router-dom"
import ListDashboard from "../pages/ListDashboard";

interface IRouter {
    path: string,
    element: React.ReactNode
}

export const publicRoutes: Array<IRouter>  = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />},
]

export const userRoutes: Array<IRouter>  = [
    {path: "/myLists", element: <ListDashboard />},
    {path: "*", element: <Navigate to="/myLists" replace />},
]