import React from 'react'

export const UserPassword = ({ formData, handleChange, togglePassword }) => {
    return (
        <>
            <div className="userPassword">
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type={formData.showPassword ? "text" : "password"}
                        className="form-control inputText"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Repite la Contraseña
                    </label>
                    <input
                        type={formData.showPassword ? "text" : "password"}
                        className="form-control inputText"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="mb-3 passwordCheck">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={togglePassword}
                    />
                    <label className="form-check-label labelPasswordCheck">Ver contraseña</label>
                </div>
            </div>

        </>
    )
}
