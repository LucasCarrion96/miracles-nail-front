import React, { useMemo } from 'react';

const ScheduleSelector = ({ isSaturday, horario, handleChange, unavailableTimes = [], isLoading }) => {


    const availableTimes = useMemo(() => ([
        { id: 1, label: '09:00' },
        { id: 2, label: '11:00' },
        { id: 3, label: '16:00' },
        { id: 4, label: '18:00 (solo capping)' },
    ]), []);

    const saturdayAvailableTimes = useMemo(() => ([
        { id: 5, label: '10:00' },
        { id: 6, label: '15:00' }
    ]), []);

    const timesToRender = isSaturday ? saturdayAvailableTimes : availableTimes;

    return (
        <>
            <h2>Horarios:</h2>
            <select
                name="horario"
                value={horario}
                className="form-select overflow-auto"
                onChange={handleChange}
                disabled={isLoading}
            >
                <option value="" disabled>Selecciona un horario</option>
                {timesToRender.map(({ id, label }) => (
                    <option
                        key={id}
                        value={id}
                        disabled={Array.isArray(unavailableTimes) && unavailableTimes.includes(id)}
                    >
                        {label}
                    </option>
                ))}
            </select>
            {isLoading && <p>Cargando horarios...</p>}
        </>
    );
};

export default ScheduleSelector;
