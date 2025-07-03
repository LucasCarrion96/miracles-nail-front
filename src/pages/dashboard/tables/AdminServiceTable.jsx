import React, { useMemo } from 'react';
import { ModalModifyTables } from "../componentsDashboard/ModalModifyTables";
import { useFetchData } from '../../../hooks/useFetchData'; // Usamos el nuevo hook
import { useModalEdit } from '../../../hooks/hooksTables/useModalEdit';

export const AdminServiceTable = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlEndpoint = `${apiUrl}/services`;
    const apiUrlSave = `${apiUrl}/services/`; // Corregido aquí

    // Usamos el nuevo hook con refreshData
    const { data, error, isLoading, refreshData } = useFetchData(apiUrlEndpoint);

    const { isOpen, selectedData, openModal, closeModal } = useModalEdit();

    if (isLoading) return <p>Cargando servicios...</p>;
    if (error) return <p>Error al obtener servicios: {error.message}</p>;

    const fields = ["nameService", "duration", "price"]; // Nombres de los campos que quieres mostrar
    const fieldsConfig = [
        { field: "nameService", type: "text" },
        { field: "duration", type: "number" },
        { field: "price", type: "number" }
    ];

    // Función para manejar la actualización de datos
    const handleSave = async (editedData) => {
        try {
            const response = await fetch(`${apiUrlSave}/${editedData.idService}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const updatedItem = await response.json();
            console.log("Respuesta del servidor con el dato actualizado:", updatedItem);

            // Usamos refreshData para actualizar la tabla
            refreshData(); // Refresca los datos después de la actualización

        } catch (error) {
            console.error('Error al guardar los datos:', error.message);
            throw error; // Propaga el error para que el modal lo maneje
        }
    };

    return (
        <>
            <div>
                <h2>Servicios</h2>
                <div className='dashboard-table'>
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Duración</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(service => (
                                <tr key={service.idService}>
                                    <th scope="row">{service.idService}</th>
                                    <td>{service.nameService}</td>
                                    <td>{service.duration}</td>
                                    <td>{service.price}</td>
                                    <td><button className='btn' onClick={() => openModal(service)}>Modificar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalModifyTables
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSave} // Usar handleSave para guardar cambios
                fields={fields}
                fieldsConfig={fieldsConfig}
                data={selectedData}
            />
        </>
    );
};
