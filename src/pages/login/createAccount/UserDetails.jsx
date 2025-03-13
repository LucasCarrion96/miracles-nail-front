import React from 'react'

export const UserDetails = ({ formData, handleChange }) => {
    return (
        <>
            <div className="userDetails">
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
                        type="text"
                        className="form-control inputText"
                        name="userSurname"
                        value={formData.userSurname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="nacimiento" className="form-label">Fecha de nacimiento<small></small></label>
                    <input
                        type="date"
                        id="nacimiento"
                        name="nacimiento"
                        value={formData.birthDate}
                        className="form-control inputText" />
                </div>
            </div>

        </>
    )
}
