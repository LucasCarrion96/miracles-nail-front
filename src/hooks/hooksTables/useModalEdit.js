import { useState } from "react";


export const useModalEdit = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const openModal = (data) => {
        setSelectedData(data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedData(null);
    };

    const saveData = async (apiUrlSave, idField, editedData) => {
        if (!editedData || !editedData[idField]) {
            console.error(`El ID del elemento es undefined para el campo '${idField}':`, editedData);
            return;
        }

        const id = editedData[idField];
        const dataToUpdate = { ...editedData };

        try {
            const response = await fetch(`${apiUrlSave}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToUpdate),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }

            console.log('Datos actualizados:', await response.json());
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    };


    return {
        isOpen,
        selectedData,
        openModal,
        closeModal,
        saveData,
    };
};