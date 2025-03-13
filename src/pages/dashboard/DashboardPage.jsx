import { useState } from "react";
import { AdminTurnsTable } from "./tables/AdminTurnsTable";
import { AdminUsersTable } from "./tables/AdminUsersTable";
import { AdminCourseTable } from "./tables/AdminCourseTable";
import { AdminServiceTable } from "./tables/AdminServiceTable";
import { AdminArtTypeTable } from "./tables/AdminArtTypeTable";


import "../../styles/dashboardPage.css";

export const DashboardPage = () => {
    // Inicializa activeTable con un nombre de tabla en lugar de un componente
    const [activeTable, setActiveTable] = useState('Turnos');

    const renderTable = () => {
        switch (activeTable) {
            case 'Turnos':
                return <AdminTurnsTable />;
            case 'Usuarios':
                return <AdminUsersTable />;
            case 'Cursos':
                return <AdminCourseTable />;
            case 'Servicios':
                return <AdminServiceTable />;
            case 'Tipo de Diseños':
                return <AdminArtTypeTable />;
            default:
                return <AdminTurnsTable />;
        }
    };

    return (
        <>
            <div className="dashboard">
                <header className="dashboardHeader">
                    <h1 className="titlePrincipal">Panel de Control</h1>
                    <div className="adminProfile">
                        <img src="" alt="" />
                        <h2 className="title">Milagros Paredes</h2>
                        <form action="get">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setActiveTable(e.target.value)} // Usa onChange para establecer el estado
                            >
                                <option value="Turnos">Turnos</option>
                                <option value="Usuarios">Usuarios</option>
                                <option value="Cursos">Cursos</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Tipo de Diseños">Tipo de Diseño</option>
                            </select>
                        </form>
                    </div>
                </header>

                {renderTable()}

            </div>
        </>
    );
};
