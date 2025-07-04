import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../componentsDashboard/modalModifyTables.css";


export const ModalModifyTables = ({ isOpen, onClose, onSave, fields, fieldsConfig, data }) => {
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && data) {
            setEditedData(data); // Inicializa editedData con los datos seleccionados
            setError(null); // Resetea el error al abrir el modal
        }
    }, [isOpen, data]);

    const handleChange = (field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = () => {
        if (JSON.stringify(editedData) === JSON.stringify(data)) {
            setError("No hay cambios para guardar."); // Mensaje si no hay cambios
            return;
        }

        onSave(editedData)
            .then(() => {
                onClose(); // Cierra el modal después de guardar
            })
            .catch((err) => {
                setError("Error al guardar los datos: " + err.message);
            });
    };

    // Si el modal no está abierto o no hay datos, no muestra nada
    if (!isOpen || !data) return null;

    return (
        <div className="modal">
            <div className="modalModifyContent bg-pink">
                <div className="close-modal">
                    <X
                        size={18}
                        onClick={onClose} />
                </div>

                <div className="modalBody ">
                    {fields.map((field) => {
                        if (!(field in data)) return null;

                        const fieldConfig = fieldsConfig.find(config => config.field === field);
                        const fieldType = fieldConfig ? fieldConfig.type : "text";

                        return (
                            <div className="formGroup" key={field}>
                                <label>{field}</label>
                                <input
                                    type={fieldType}
                                    value={editedData[field] || ""}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                            </div>
                        );
                    })}
                    {error && <div className="error">{error}</div>}
                </div>

                <div className="modalFooter">
                    <button onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
};
