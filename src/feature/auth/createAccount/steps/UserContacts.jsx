import React from 'react'

export const UserContacts = ({ formData, handleChange }) => {
    return (
        <>
            <div className="userContact">
                <h4 className='subtitle'>Medios de Contacto</h4>
                <div className="form-group">
                    <input
                        placeholder="Celular +54 **********"
                        type="tel"
                        className="input-form inputText"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="form-group">
                    <input
                        type="email"
                        className="input-form inputText"
                        name="mail"
                        id="mail"
                        placeholder="Correo Electrónico"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                        autoComplete="new-email"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="input-form inputText"
                        name="confirmMail"
                        id="confirmMail"
                        placeholder="Confirmar Correo Electrónico"
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
