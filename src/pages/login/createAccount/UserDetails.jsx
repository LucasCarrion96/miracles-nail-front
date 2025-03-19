import React from 'react'

export const UserDetails = ({ formData, handleChange }) => {
    return (
        <>
            <div className="userDetails">
                <h4>Datos personales</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        placeholder="Solo un nombre"
                        type="text"
                        className="form-control inputText"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                        Apellido
                    </label>
                    <input
                        placeholder="Solo un apellido"
                        type="text"
                        className="form-control inputText"
                        name="userSurname"
                        value={formData.userSurname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">Fecha de nacimiento<small></small></label>
                    <input
                        type="date"
                        id="nacimiento"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="form-control inputText" />
                </div>
            </div>

        </>
    )
}
