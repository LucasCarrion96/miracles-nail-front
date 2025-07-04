import { useState } from "react";
import axios from "axios";

export const useCheckSession = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true); // Estado de carga para verificar la sesión
    const [user, setUser] = useState(null); // Agregar el estado del usuario

    const checkSession = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/session/check-session`, { withCredentials: true });
            console.log("Respuesta del backend:", response.data.user); // Ver la respuesta

            if (response.data.loggedIn) {
                setIsLoggedIn(true);
                setUser(response.data.user); // Guardar los datos del usuario
                console.log('usuario', response.data.user)
            } else {
                setIsLoggedIn(false);
                setUser(null); // Si no está autenticado, asegurarse de que el estado del usuario sea null
            }
        } catch (error) {
            console.error("Error al verificar la sesión:", error);
            setIsLoggedIn(false);
            setUser(null); // Asegurarse de que el usuario sea null en caso de error
        } finally {
            setIsChecking(false); // Finaliza el estado de carga
        }
    };

    return { isLoggedIn, setIsLoggedIn, isChecking, checkSession, user, setUser };
};