import React from 'react'

export const ServicesModal = ({ selects, services, handleChange }) => {
    if (!Array.isArray(services)) {
        return <p>Error: Los servicios no están disponibles</p>;
    }

    return (
        <>
            <h2>Servicios:</h2>
            <select
                name="service"
                value={selects?.service || ''}
                className="form-select overflow-auto"
                onChange={handleChange}
            >
                <option value="" disabled>Selecciona un Servicio</option>
                {services
                    .filter(service => !['Service', 'Nada'].includes(service.nameService) && ![12, 13].includes(service.idService))
                    .map(service => (
                        <option key={service.idService} value={service.idService}>
                            {service.nameService} - ${service.price}
                        </option>
                    ))}
            </select>
            <div className="radioTurn">
                {services
                    .filter(service => [12, 13].includes(service.idService))
                    .map(service => (
                        <div className="form-check form-check-inline" key={service.idService}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="radioService"
                                id={`inlineRadio${service.idService}`}
                                value={service.idService}
                                onChange={handleChange}
                                checked={selects.radioService === String(service.idService)}
                            />
                            <label className="form-check-label" htmlFor={`inlineRadio${service.idService}`}>
                                {service.nameService}
                            </label>
                        </div>
                    ))}
            </div>
        </>
    );
};