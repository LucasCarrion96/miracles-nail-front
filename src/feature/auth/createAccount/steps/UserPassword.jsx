import React from 'react'
import { IconButton } from "@components/button/icon-button/IconButton";

export const UserPassword = ({ formData, handleChange, togglePassword }) => {

    return (
        <>
            <div className="userPassword">
                <h4 className='subtitle'>Crea una contraseña</h4>
                <div className="form-group">
                    <input
                        type={formData.showPassword ? "text" : "password"}
                        className="input-form input-text"
                        name="password"
                        id='password'
                        placeholder="Contaseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                        Repite la Contraseña
                    </label>
                    <input
                        type={formData.showPassword ? "text" : "password"}
                        className="input-form input-text"
                        placeholder="Repita Contaseña"
                        name="confirmPassword"
                        id='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="password-check">
                    <label className="form-check-label labelPasswordCheck">Ver contraseña</label>
                    <IconButton
                        size="26"
                        className="toggle-password"
                        handleClick={() => togglePassword()}
                        icon={formData.showPassword ? "EyeClosed" : "Eye"}
                    />

                </div>
            </div>

        </>
    )
}
