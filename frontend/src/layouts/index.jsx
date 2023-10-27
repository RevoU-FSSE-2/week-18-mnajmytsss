import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from "../components/navbar";


const Layout = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const isAuth = useMemo(
        () => {
            if(location.pathname) {
                return !!token
            }
        },
        [location.pathname, token]
    )

    if(isAuth) {
        return (
            <div>
                <NavBar />
                <Outlet />
            </div>
        )
    } return <Navigate to="/login" />
}

export default Layout