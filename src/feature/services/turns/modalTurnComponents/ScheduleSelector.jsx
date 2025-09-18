import React, { useMemo } from 'react';
import { CustomSelect } from '../../../../components/form/select/CustomSelect';
import { span } from 'framer-motion/client';
const ScheduleSelector = ({ isSaturday, horario, handleChange, unavailableTimes = [], isLoading }) => {


    const availableTimes = useMemo(() => ([
        { id: 1, label: (<span className='content-text'>09:00</span>) },
        { id: 2, label: (<span className='content-text'>11:00</span>) },
        { id: 3, label: (<span className='content-text'>16:00</span>) },
        {
            id: 4, label: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className='content-text'>18:00</span>
                    <span className='small-text'>Solo Capping</span>
                </div>
            )
        },
    ]), []);

    const saturdayAvailableTimes = useMemo(() => ([
        { id: 5, label: (<span className='content-text'>10:00</span>) },
        { id: 6, label: (<span className='content-text'>15:00</span>) }
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
