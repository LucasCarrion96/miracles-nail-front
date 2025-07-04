import React, { useEffect, useState } from 'react';
import "./modalTurns.css";
import { DateSelector } from './modalTurnComponents/DateSelector';
import ModalHeader from './modalTurnComponents/ModalHeader';
import { useCounter } from './hooksTurns/useCounters';
import { useFetchServices } from './hooksTurns/useFetchServices';
import { useUnavailableTimes } from './hooksTurns/useUnavailableTimes';
import { useSubmitConfirm } from './hooksTurns/useSubmitConfirm';
import { useAlert } from '../../../hooks/useAlert';
import { CustomAlert } from '../../../components/alerts/CustomAlert';
import { FormModal } from './modalTurnComponents/FormModal';

export const ModalTurns = ({
    isSaturday, isSunday, isFullDay, fullDaysLoading, isPastDate, year, month, day,
    selectedDate, setSelectedDate, reloadFullDays
}) => {
    const { services, artTypes } = useFetchServices();
    const { state, dispatch } = useCounter();
    const [selects, setSelects] = useState({ horario: '', service: '', radioService: '' });
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { alertVisible, alertMessage, showConfirmButton, showSignNowButton, showAlert, hideAlert, onConfirm, onSignNow } = useAlert();
    const apiUrl = import.meta.env.VITE_API_URL;

    const { handleSubmit, modalSignalClose, setmodalSignalClose } = useSubmitConfirm(showAlert, hideAlert, apiUrl, selectedDate, services, artTypes, selects, state, reloadFullDays);
    const { unavailableTimesState, isLoading, refreshData } = useUnavailableTimes(`${apiUrl}/schedules/${year}-${month}-${day}/unavailable-times`, modalSignalClose);

    const handleModal = (action) => {
        if (action === 'open') {
            setIsMounted(true);
            refreshData();
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), 500);
        }
    };

    useEffect(() => {
        if (modalSignalClose) {
            handleModal('close');
            setSelects({ horario: '', service: '', radioService: '' });
            dispatch({ type: 'RESET' });
            setmodalSignalClose(false);
        }
    }, [modalSignalClose]);

    useEffect(() => {
        document.querySelectorAll('.calendar-day').forEach(button => {
            button.disabled = isMounted;
            button.classList.toggle('disabled', isMounted);
        });
    }, [isMounted]);

    const handleDateChange = (day) => {
        const newSelectedDate = new Date(year, month - 1, day);
        if (newSelectedDate.getTime() !== selectedDate?.getTime()) {
            setSelectedDate(newSelectedDate);
            dispatch({ type: 'RESET' });
            setSelects({ horario: '', service: '', radioService: '' });
        }
    };

    return (
        <div onClick={() => handleDateChange(day)} className='calendar-day'>
            <DateSelector {...{ day, isFullDay, isSunday, isPastDate, fullDaysLoading, onClick: () => { handleDateChange(day); handleModal('open'); } }} />
            {isMounted && (
                <>
                    <div className={`fade-modal ${isVisible ? 'visible' : ''}`} />
                    <div className={`modal-turn bg-light-black ${isVisible ? 'visible' : ''}`}>
                        <div className='boreder-radius-20'>
                            <ModalHeader
                                onClose={() => handleModal('close')}
                                selectedDate={selectedDate}
                            />
                            <FormModal
                                handleSubmit={handleSubmit}
                                services={services}
                                setSelects={setSelects}
                                selects={selects}
                                state={state}
                                dispatch={dispatch}
                                isLoading={isLoading}
                                isSaturday={isSaturday}
                                unavailableTimes={unavailableTimesState}
                            />
                            {alertVisible && (
                                <CustomAlert
                                    message={alertMessage}
                                    visible={alertVisible}
                                    onClose={hideAlert}
                                    onConfirm={onConfirm}
                                    onSignNow={onSignNow}
                                    showConfirmButton={showConfirmButton}
                                    showSignNowButton={showSignNowButton}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};