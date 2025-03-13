import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "../pages/home/HomePage";
import { CoursesPage } from "../pages/courses/CoursesPage";
import { TakeTurnPage } from "../pages/turns/TakeTurnPage";
import { LoginPage } from "../pages/login/LoginPage";
import { AboutPage } from "../pages/AboutPage";
import { UserPage } from "../pages/userProfile/UserPage";
import { UserConfig } from "../pages/userProfile/UserConfig";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { CreateAccount } from "../pages/login/createAccount/CreateAccount";
import { PaymentDeposit } from "../pages/turns/PaymentDeposit"
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const RoutesNav = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cursos" element={<CoursesPage />} />
            <Route path="/sobremi" element={<AboutPage />} />

            {/* Rutas de inicio y creacion de perfil */}
            <Route path="/iniciar-sesion" element={
                <PublicRoutes>
                    <LoginPage />
                </PublicRoutes>
            }
            />
            <Route path="/iniciar-sesion/crear-cuenta" element={
                <PublicRoutes>
                    <CreateAccount />
                </PublicRoutes>
            }
            />

            {/* Rutas privadas */}
            <Route
                path="/turnos"
                element={
                    <PrivateRoutes>
                        <TakeTurnPage />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/pagar-seña"
                element={
                    <PrivateRoutes>
                        <PaymentDeposit />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/user"
                element={
                    <PrivateRoutes>
                        <UserPage />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/user/config"
                element={
                    <PrivateRoutes>
                        <UserConfig />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoutes requiredRole="admin">
                        <DashboardPage />
                    </PrivateRoutes>
                }
            />

            {/* Ruta por defecto */}
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};