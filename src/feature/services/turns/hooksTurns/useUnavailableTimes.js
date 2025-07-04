import { useState, useEffect } from "react";
import { useFetchData } from '@api';

export const useUnavailableTimes = (apiUrlEndPoint, modalSignalClose) => {
    const { data: unavailableTimes, isLoading, refreshData } = useFetchData(apiUrlEndPoint);
    const [unavailableTimesState, setUnavailableTimesState] = useState([]);

    // Sincroniza los horarios ocupados con la API
    useEffect(() => {
        if (unavailableTimes) {
            setUnavailableTimesState(unavailableTimes);
        }
    }, [unavailableTimes]);

    // Limpia los horarios ocupados cuando se cierra el modal
    useEffect(() => {
        if (modalSignalClose) {
            setUnavailableTimesState([]); // 🧹 Resetea horarios ocupados
        }
    }, [modalSignalClose]);

    return { unavailableTimesState, isLoading, refreshData };
};
