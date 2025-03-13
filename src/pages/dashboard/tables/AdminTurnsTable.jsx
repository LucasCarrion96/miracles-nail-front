import React, { useState, useCallback } from 'react';
import "../../../styles/dashboardPage.css";
import { usePaginationFetchData } from '../../../hooks/hooksTables/usePaginationFetchData';
import { ModalOnlyText } from '../componentsDashboard/ModalOnlyText';
import { useDataMapper } from '../../../hooks/hooksTables/useDataMapper';
import { useSelectableItem } from '../../../hooks/hooksTables/useSelectableItem ';
import { useDeleteData } from '../../../hooks/useDeleteData';

export const AdminTurnsTable = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/turns`;

    const dataMapper = useDataMapper('turns')

    const {
        data,
        currentPage,
        totalPages,
        loading,
        error,
        handleNextPage,
        handlePreviousPage,
        handleRefresh,
        handleHardRefresh,
    } = usePaginationFetchData(apiUrl, 1, 10, dataMapper);

    // Hook para manejar la selección de turnos para afecciones de salud
    const { selectedItem: selectedHealthTurn, isModalOpen: isHealthModalOpen, handleSelectItem: handleShowHealthConditions, closeModal: closeHealthModal } = useSelectableItem();

    // Hook para manejar la selección de turnos para agregados
    const { selectedItem: selectedAgregadosTurn, isModalOpen: isAgregadosModalOpen, handleSelectItem: handleShowAgregados, closeModal: closeAgregadosModal } = useSelectableItem();

    const getHealthConditionDescription = (condition) => {
        return condition.idHealthCondition === 1
            ? condition.otherConditionDescription
            : condition.healthCondition.healthCondition;
    };
    const { mutate: deleteTurn, isLoading, isError, error: deleteError } = useDeleteData('turns');

    const handleDeleteTurn = (idTurns) => {
        deleteTurn(idTurns);
    };

    if (loading) return <p>Cargando turnos...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;

    return (
        <>
            <div className="tableHeader">
                <h2 className="subtitle">Turnos</h2>
                <button onClick={handleRefresh} >
                    refresh
                </button>
                <button onClick={handleHardRefresh} >
                    hard refresh
                </button>
            </div>
            <div className='dashboardTable'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Horario</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Agregados</th>
                            <th scope="col">Afecciones</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Señado</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(turn => (
                            <tr key={turn.idTurns}>
                                <td>{new Date(turn.turnDay).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</td>
                                <td>{turn.Schedule.timeSchedule.split(':').slice(0, 2).join(':')}</td>
                                <td>{turn.Service.nameService}</td>
                                <td>
                                    <button onClick={() => handleShowAgregados(turn)}>
                                        Ver Más
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleShowHealthConditions(turn)}>
                                        Afecciones
                                    </button>
                                </td>
                                <td>{turn.User.userName}</td>
                                <td>{turn.User.userSurname}</td>
                                <td>{turn.confirmed === 0 ? 'No' : 'Si'}</td>
                                <td>
                                    <button onClick={() => handleDeleteTurn(turn.idTurns)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Siguiente</button>
            </div>

            {/* Modal para afecciones */}
            <ModalOnlyText
                isOpenList={isHealthModalOpen}
                onCloseList={closeHealthModal}
                title={`Afecciones de ${selectedHealthTurn ? selectedHealthTurn.User.userName : ''}`}
                listItems={
                    selectedHealthTurn?.User.UserHealthConditions
                        ? selectedHealthTurn.User.UserHealthConditions.map(getHealthConditionDescription)
                        : []
                }
            />

            {/* Modal para agregados */}
            <ModalOnlyText
                isOpenList={isAgregadosModalOpen}
                onCloseList={closeAgregadosModal}
                title={`Agregados de ${selectedAgregadosTurn ? selectedAgregadosTurn.User.userName : ''}`}
                listItems={
                    selectedAgregadosTurn
                        ? [
                            `Nail Art: ${selectedAgregadosTurn.nailArtQuantity}`,
                            `Caricature: ${selectedAgregadosTurn.caricatureQuantity}`,
                            `3D: ${selectedAgregadosTurn["3dQuantity"]}`
                        ]
                        : []
                }
            />
        </>
    );
};
