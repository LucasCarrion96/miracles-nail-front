import React from 'react'
import ScheduleSelector from './ScheduleSelector';
import CounterModal from './CounterModal';
import { ServicesModal } from './ServicesModal';

export const FormModal = ({ handleSubmit, services, setSelects, selects, state, dispatch, isLoading, isSaturday, unavailableTimes }) => {
    // Maneja los cambios en los selects del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelects(prev => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <div className="modal-turn-body bg-gray-pearl">

                <form onSubmit={handleSubmit}>
                    <div className='selects-modal'>
                        <ScheduleSelector
                            horario={selects?.horario || ''}
                            handleChange={handleChange}
                            isSaturday={isSaturday}
                            unavailableTimes={unavailableTimes}
                            isLoading={isLoading}
                        />
                        <ServicesModal
                            services={services}
                            selects={selects}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className='counters-modal-container'>
                        <div className='counters-modal-title'>
                            <h2 className='subtitle'>Diseños</h2>
                            <p className='small-text'><span className='content-text'>Atención:</span> Recuerda que cada servicio incluye 2 diseños simples de regalo...</p>
                        </div>
                        <div className='counters-modal'>
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
                    </div>
                    <div className='submit-modal-container'>
                        <button className='submit-modal btn-text bg-deep-pink' type="submit" disabled={isLoading}>Confirmar turno</button>
                    </div>
                </form>
            </div>

        </>
    )
}
