import React from 'react';
import './CustomAlert.css';

export const CustomAlert = ({
    message,
    onClose,
    onConfirm,
    onSignNow,
    visible,
    showConfirmButton,
    showSignNowButton
}) => {
    if (!visible) return null;

    return (
        <div className="alert">
            <div className="alert-content">
                <div dangerouslySetInnerHTML={{ __html: message }} />
                <div>
                    {showConfirmButton && onConfirm && <button
                        className='btn btn-primary'
                        onClick={onConfirm} aria-label="Reservar">Reservar</button>}
                    {showSignNowButton && onSignNow && <button
                        className='btn btn-secondary'
                        onClick={onSignNow} aria-label="Señar Ahora">Señar Ahora</button>}
                    <button
                        className='btn btn-danger'
                        onClick={onClose} aria-label="Cerrar">Cerrar</button>
                </div>
            </div>
        </div>
    );
};
