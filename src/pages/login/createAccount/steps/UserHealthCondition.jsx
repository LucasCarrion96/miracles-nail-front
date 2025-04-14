import React from "react";

export const UserHealthCondition = ({ formData, handleChange }) => {
    return (
        <div className="userHealthConditions">
            <h4>Padeces de algún condicionamiento?</h4>

            <div className="mb-3">
                <label htmlFor="healthCondition" className="form-label">
                    Alergias Comunes:
                </label>
                <select
                    className="form-select"
                    name="healthCondition"
                    id="healthCondition"
                    value={formData.healthCondition}
                    onChange={handleChange}
                >
                    <option value="">Ver lista de alergias</option>
                    <option value="1">Otros</option>
                    <option value="2">Onicolisis</option>
                    <option value="3">Alergia a polímeros</option>
                    <option value="4">Onicofagia</option>
                </select>
            </div>

            {/* Si el usuario selecciona "Otros", mostramos el input adicional */}
            {formData.healthCondition === "1" && (
                <div className="mb-3">
                    <label htmlFor="otherHealthCondition" className="form-label">
                        Especificar otra condición:
                    </label>
                    <input
                        placeholder="Solo un nombre"
                        type="text"
                        className="form-control inputText"
                        name="otherHealthCondition"
                        id="otherHealthCondition"
                        value={formData.otherHealthCondition}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            <p>Nota: <br />
                Por razones de salud y seguridad, el servicio de manicura no podrá realizarse <br />
                en personas conafecciones fúngicas o condiciones médicas <br />
                que puedan verse afectadas por el procedimiento.<br />
                Mas informacion en terminos y condiciones (Ver terminos y Condiciones)
            </p>
        </div>
    );
};
