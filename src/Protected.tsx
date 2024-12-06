import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthProvider";


export const Protected = () => {

    const { authenticated } = useContext(AuthContext);

    return authenticated ? <Outlet /> : <Navigate to='/'/>
}