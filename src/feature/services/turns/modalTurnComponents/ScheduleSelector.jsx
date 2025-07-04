import React, { useMemo } from 'react';
import { CustomSelect } from '../../../../components/form/select/CustomSelect';
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

    const options = timesToRender.map(({ id, label }) => ({
        value: id,
        label: label,
        isDisabled: Array.isArray(unavailableTimes) && unavailableTimes.includes(id),
    }));
    console.log("horariooptions", options);

    return (
        <>
            <div className='schedule-selector'>
                <h2 className='subtitle'>Horarios:</h2>
                <CustomSelect
                    name="horario"
                    options={options}
                    value={horario}
                    onChange={(selected) =>
                        handleChange({ target: { name: "horario", value: selected?.value } })
                    }
                    placeholder="Selecciona un Horario"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    loadingMessage={() => "Cargando horarios..."}
                />
                {isLoading && <p>Cargando horarios...</p>}
            </div>
        </>
    );
};

export default ScheduleSelector;
