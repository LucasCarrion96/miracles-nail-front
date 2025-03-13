import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCheckSession } from "../hooks/useCheckSession";

export const PublicRoutes = ({ children }) => {
    const { isLoggedIn, isChecking, checkSession } = useCheckSession();
    const [isSessionChecked, setIsSessionChecked] = useState(false);

    useEffect(() => {
        const verifySession = async () => {
            await checkSession();
            setIsSessionChecked(true);
        };
        verifySession();
    }, []);

    if (!isSessionChecked || isChecking) {
        return <p>Cargando...</p>; // Indicador de carga mientras verificamos la sesión
    }

    if (isLoggedIn) {
        console.log("Usuario autenticado. Redirigiendo a inicio...");
        return <Navigate to="/" replace />;
    }

    return children;
};