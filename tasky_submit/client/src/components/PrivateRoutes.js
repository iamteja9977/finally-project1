import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
    let auth = localStorage.getItem("token");
    return (
        auth ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes;