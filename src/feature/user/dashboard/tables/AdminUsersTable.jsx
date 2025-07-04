import React, { useCallback, useState } from 'react';
import { useModalRead } from '../../../../hooks/hooksTables/useModalRead';
import { usePaginationFetchData } from '@api';
import { ModalOnlyText } from '../componentsDashboard/ModalOnlyText';
import { useDataMapper } from '../../../../hooks/hooksTables/useDataMapper';
import { useSelectableItem } from '../../../../hooks/hooksTables/useSelectableItem ';

export const AdminUsersTable = () => {
    //api
    const apiUrl = `${import.meta.env.VITE_API_URL}/users`;
    // Usamos el hook de paginación con los parámetros correspondientes
    // Mapper para transformar la respuesta en el formato esperado por el hook
    const dataMapper = useDataMapper('users')
    const {
        data,
        currentPage,
        totalPages,
        loading,
        error,
        handleNextPage,
        handlePreviousPage,
    } = usePaginationFetchData(apiUrl, 1, 10, dataMapper);
    //modal para cursos
    const { selectedItem, isModalOpen, handleSelectItem, closeModal } = useSelectableItem();

    // Si los datos aún están cargando, mostramos el mensaje de carga
    if (loading) return <p>Cargando usuarios...</p>;

    // Si hay un error, mostramos el mensaje de error
    if (error) return <p>Error al cargar los usuarios: {error.message}</p>;

    return (
        <>
            <div className='headerTable'>
                <div>
                    <h2 className='title'>Usuarios</h2>
                </div>
                <div>

                    <div className="formTable">
                        <div className="form-floating mb-3">
                            <label htmlFor="floatingInput">Buscar Usuario:</label>
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-table'>
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Cursos</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user.idUser}>
                                <th scope="row">{user.idUser}</th>
                                <td>{user.userName}</td>
                                <td>{user.userSurname}</td>
                                <td>{user.mail}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className='btn' onClick={() => handleSelectItem(user)}>
                                        Cursos
                                    </button>
                                </td>
                                <td>{user.active === 1 ? 'Sí' : 'No'}</td>
                                <td><button className='btn btn-danger'>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Siguiente</button>
            </div>

            <ModalOnlyText
                isOpenList={isModalOpen}
                onCloseList={closeModal}
                title={`Cursos de ${selectedItem?.userName || ''}`}
                listItems={selectedItem?.Courses?.map(course => course.title) || []}
            />
        </>
    );
};
