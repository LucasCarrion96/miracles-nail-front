import React from 'react'

export const UserContacts = ({ formData, handleChange }) => {
    return (
        <>
            <div className="userContact">
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Número de Celular
                    </label>
                    <input
                        placeholder="+54 261 111 1111"
                        type="tel"
                        className="form-control inputText"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control inputText"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                        autoComplete="new-email"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmMail" className="form-label">
                        Confirma tu Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control inputText"
                        name="confirmMail"
                        value={formData.ConfirmMail}
                        onChange={handleChange}
                        required
                        autoComplete="new-email"
                    />
                </div>
            </div>


        </>
    )
}
