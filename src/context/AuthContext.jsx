import { createContext, useEffect, useState } from "react";
import { useCheckSession } from '@api';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isLoggedIn, setIsLoggedIn, isChecking, checkSession, user, setUser } = useCheckSession();
    const [loading, setLoading] = useState(true);  // Agregar estado de carga
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchSessionData = async () => {
            await checkSession(); // Asegúrate de que los datos estén listos
            setLoading(false);  // Una vez que se complete la verificación, cambia el estado de carga
        };

        fetchSessionData();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${apiUrl}/auth/session/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mail: email, password }),
                credentials: "include",
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok && data.user) {
                setUser(data.user);
                setIsLoggedIn(true);
                return data.user;
            } else {
                return { error: data.message || "Error al iniciar sesión" };
            }
        } catch (error) {
            return { error: "Error al conectar con el servidor" };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/session/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isChecking, login, logout, user, setUser, loading, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};