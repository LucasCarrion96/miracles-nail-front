import React from 'react'
import ScheduleSelector from './ScheduleSelector';
import CounterModal from './CounterModal';
import { ServicesModal } from './ServicesModal';

export const FormModal = ({ selectedDate, handleSubmit, services, setSelects, selects, state, dispatch, isLoading, isSaturday, unavailableTimes }) => {
    // Maneja los cambios en los selects del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelects(prev => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <div className="modalTurnBody">
                <h1>Fecha seleccionada: {selectedDate ? selectedDate.toLocaleDateString() : 'Selecciona una fecha'}</h1>
                <form onSubmit={handleSubmit}>
                    <ScheduleSelector
                        horario={selects?.horario || ''}
                        handleChange={handleChange}
                        isSaturday={isSaturday}
                        unavailableTimes={unavailableTimes} // ✅ Hook optimizado
                        isLoading={isLoading}  // ✅ Indicamos si está cargando
                    />
                    <ServicesModal
                        services={services}
                        selects={selects}
                        handleChange={handleChange}
                    />
                    <div>
                        <h1>Diseños</h1>
                        <p>Atención: Recuerda que cada servicio incluye 2 diseños simples de regalo...</p>
                    </div>
                    <div className='countersModal'>
                        <CounterModal
                            title="NailArt"
                            count={state?.nailArtCount || '0'}
                            onIncrement={() => dispatch({ type: 'INCREMENT_NAIL_ART' })}
                            onDecrement={() => dispatch({ type: 'DECREMENT_NAIL_ART' })}
                        />
                        <CounterModal
                            title="3D"
                            count={state?.threeDCount || '0'}
                            onIncrement={() => dispatch({ type: 'INCREMENT_3D' })}
                            onDecrement={() => dispatch({ type: 'DECREMENT_3D' })}
                        />
                        <CounterModal
                            title="Caricatura"
                            count={state?.caricatureCount || '0'}
                            onIncrement={() => dispatch({ type: 'INCREMENT_CARICATURE' })}
                            onDecrement={() => dispatch({ type: 'DECREMENT_CARICATURE' })}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>Confirmar turno</button>
                </form>
            </div>

        </>
    )
}
