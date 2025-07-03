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
        <div className="alert boreder-radius-20">
            <div className='alert-header bg-deep-pink'>
                <h3>ATENCION!</h3>
                <button
                    className='btn'
                    onClick={onClose} aria-label="Cerrar">
                    Cerrar
                </button>
            </div>
            <div className="alert-content bg-gray-pearl">
                <div dangerouslySetInnerHTML={{ __html: message }} />
                <div>
                    {showConfirmButton && onConfirm && <button
                        className='btn btn-primary'
                        onClick={onConfirm} aria-label="Reservar">Reservar</button>}
                    {showSignNowButton && onSignNow && <button
                        className='btn btn-secondary'
                        onClick={onSignNow} aria-label="Señar Ahora">Señar Ahora</button>}

                </div>
            </div>
        </div>
    );
};
