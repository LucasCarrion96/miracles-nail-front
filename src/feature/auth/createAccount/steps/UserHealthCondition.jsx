import React from "react";
import { CustomSelect } from "@components/select";

export const UserHealthCondition = ({ formData, handleChange }) => {
    const options = [
        { value: '1', label: 'Nada' },
        { value: '2', label: 'Otros' },
        { value: '3', label: 'Onicolisis' },
        { value: '4', label: 'Alergia a Polimeros' },
        { value: '5', label: 'Onicofagia' },
    ];
    return (
        <div className="user-health-conditions">
            <h4 className="subtitle">Afecciones de salud</h4>
            <div className="conditions-form">
                <CustomSelect
                    options={options}
                    value={options.find(option => option.value === formData.healthCondition) || null}
                    placeholder="Condicion de salud"
                    name="nn"
                    id="nn"
                    onChange={(selected) =>
                        handleChange({ target: { name: 'healthCondition', value: selected.value } })
                    }
                />
                {/* Si el usuario selecciona "Otros", mostramos el input adicional */}
                {formData.healthCondition === "2" && (
                    <div className="other-health-condition">
                        <label htmlFor="otherHealthCondition" className="form-label">
                            Especificar otra condición:
                        </label>
                        <input
                            placeholder="Solo nombre, sin descripción"
                            type="text"
                            className="input-form"
                            name="otherHealthCondition"
                            id="otherHealthCondition"
                            value={formData.otherHealthCondition}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <p className="small-text">Nota: <br />
                    Por razones de salud y seguridad, si padeces otra affecion no listada
                    leer los terminos y condiciones antes de continuar o cominicate con la manicurista.
                    Sobre salud leer Seccion 3 (Ver terminos y Condiciones)
                </p>
            </div>
        </div>
    );
};
