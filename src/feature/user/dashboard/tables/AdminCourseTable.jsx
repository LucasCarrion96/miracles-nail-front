import React from 'react';
import { ModalModifyTables } from "../componentsDashboard/ModalModifyTables";
import { useModalEdit } from '../../../../hooks/hooksTables/useModalEdit';
import { useModalRead } from '../../../../hooks/hooksTables/useModalRead';
import { ModalOnlyText } from '../componentsDashboard/ModalOnlyText';
import { useFetchData } from '@api'; // Nuevo hook importado
import { IconButton } from '@components/button/icon-button/IconButton';
export const AdminCourseTable = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token en localStorage');
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlEndpoint = `${apiUrl}/services/courses`;
    const apiUrlSave = `${apiUrl}/sevices/courses/`; // Endpoint para guardar los datos

    // Usamos useFetchData en lugar de tableRefreshData
    const { data, error, isLoading, refreshData } = useFetchData(apiUrlEndpoint);

    const { isOpen, selectedData, openModal, closeModal } = useModalEdit();
    const { isOpenText, selectedItem, openTextModal, closeTextModal } = useModalRead();

    if (isLoading) return <p>Cargando cursos...</p>;
    if (error) return <p>Error al obtener cursos: {error.message}</p>;

    const fields = ["title", "category", "description", "price", "duration"];
    const fieldsConfig = [
        { field: "title", type: "text" },
        { field: "category", type: "text" },
        { field: "description", type: "text" },
        { field: "duration", type: "number" },
        { field: "price", type: "number" }
    ];

    // Función para manejar la actualización de datos
    const handleSave = async (editedData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token en localStorage');
        }

        try {
            const response = await fetch(`${apiUrlSave}/${editedData.idCourse}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editedData),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const updatedItem = await response.json();
            console.log("Respuesta del servidor con el dato actualizado:", updatedItem);

            // Actualiza la lista de datos usando refetch
            refreshData(); // Esto actualizará los datos sin necesidad de hacer un setData manual

        } catch (error) {
            console.error('Error al guardar los datos:', error.message);
            throw error; // Propaga el error para que el modal lo maneje
        }
    };

    return (
        <>
            <div>
                <h2 className='title'>Cursos</h2>
            </div>
            <div className='dashboard-table'>
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Duración</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(course => (
                            <tr key={course.idCourse}>
                                <th scope="row">{course.idCourse}</th>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td>
                                    <IconButton
                                        handleClick={() => openTextModal(course)}
                                        icon="BookOpen"
                                        color="white"
                                        btnClass="btn btn-black"
                                        size={20}
                                    />

                                </td>
                                <td>{course.price}</td>
                                <td>{course.duration}</td>
                                <td>
                                    <IconButton
                                        handleClick={() => openModal(course)}
                                        icon="SquarePen"
                                        color="white"
                                        btnClass="btn btn-black"
                                        size={20}
                                    />
                                </td>
                                <td>
                                    <IconButton
                                        icon="Trash"
                                        color="white"
                                        btnClass="btn btn-danger"
                                        size={20}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalOnlyText
                isOpenText={isOpenText}
                onCloseText={closeTextModal}
                title={selectedItem ? selectedItem.title : ''}
                content={selectedItem ? selectedItem.description : ''}
            />

            <ModalModifyTables
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSave}
                fields={fields}
                fieldsConfig={fieldsConfig}
                data={selectedData}
            />
        </>
    );
};
