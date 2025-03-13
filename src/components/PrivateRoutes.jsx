import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoutes = ({ children, requiredRole }) => {
    const { isLoggedIn, isChecking, user, loading, checkSession } = useContext(AuthContext);

    console.log("Estado de autenticación:", { isLoggedIn, isChecking, user });

    if (loading) {
        return <p>Cargando...</p>; // Mostrar cargando mientras se verifica la sesión
    }

    if (isChecking) {
        return <p>Cargando...</p>;
    }

    if (!isLoggedIn) {
        console.log("Usuario no autenticado. Redirigiendo a iniciar sesión...");
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        console.log("Usuario sin permisos. Redirigiendo a home...");
        return <Navigate to="/" replace />;
    }

    return children;
};