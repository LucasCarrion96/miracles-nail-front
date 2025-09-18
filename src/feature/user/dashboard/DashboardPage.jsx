import { useState } from "react";
import { AdminTurnsTable } from "./tables/AdminTurnsTable";
import { AdminUsersTable } from "./tables/AdminUsersTable";
import { AdminCourseTable } from "./tables/AdminCourseTable";
import { AdminServiceTable } from "./tables/AdminServiceTable";
import { AdminArtTypeTable } from "./tables/AdminArtTypeTable";
import { CustomSelect } from '@components/form';

import "./dashboardPage.css";


const options = [
    { value: 'Turnos', label: 'Turnos' },
    { value: 'Usuarios', label: 'Usuarios' },
    { value: 'Cursos', label: 'Cursos' },
    { value: 'Servicios', label: 'Servicios' },
    { value: 'Tipo de Diseños', label: 'Art Type' }
]
export const DashboardPage = () => {
    // Inicializa activeTable con un nombre de tabla en lugar de un componente
    const [activeTable, setActiveTable] = useState('Turnos');

    const handleChange = (opcion) => {
        setActiveTable(opcion.value);
    };
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
                <header className="dashboard-header bg-light-black">
                    <h1 className="title">Panel de Control</h1>
                    <img src="" alt="" />
                    <h1 className="title-principal admin-name">Milagros Paredes</h1>
                    <form className="dashboard-form" action="get">
                        <CustomSelect
                            options={options}
                            value={activeTable}
                            onChange={handleChange}
                            placeholder="Selecciona una tabla"
                        />
                    </form>
                </header>
                <main className="dashboard-main">
                    {renderTable()}
                </main>


            </div>
        </>
    );
};
