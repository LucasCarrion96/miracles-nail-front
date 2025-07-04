import { useState, useEffect, useMemo } from 'react';
import { useFetchData } from '@api';

export const useCalendar = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullDays, setFullDays] = useState([]);
    const [fullDaysLoading, setFullDaysLoading] = useState(true);

    const formattedMonth = month < 10 ? `0${month}` : month;
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data: fullDaysData, loading: fullDaysRequestLoading } = useFetchData(
        `${apiUrl}/schedules/full-days/${year}/${formattedMonth}`
    );

    useEffect(() => {
        setFullDaysLoading(true);
    }, [year, month]);

    useEffect(() => {
        if (!fullDaysRequestLoading && fullDaysData) {
            setFullDays(fullDaysData);
            setFullDaysLoading(false);
        }
    }, [fullDaysRequestLoading, fullDaysData]);

    const reloadFullDays = async () => {
        setFullDaysLoading(true);
        try {
            const response = await fetch(`${apiUrl}/schedules/full-days/${year}/${formattedMonth}`);
            const data = await response.json();
            setFullDays(data);
        } catch (error) {
            console.error("Error al recargar días completos:", error);
        } finally {
            setFullDaysLoading(false);
        }
    };

    const getFullDaysForMonth = useMemo(() => {
        return fullDays.filter(day => day.startsWith(`${year}-${formattedMonth}`));
    }, [fullDays, year, formattedMonth]);

    const months = [...Array(12).keys()].map(i =>
        new Date(0, i).toLocaleString('es-ES', { month: 'long' })
    );

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    const getStartDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

    const handlePrevMonth = () => {
        if (year > currentYear || (year === currentYear && month > currentMonth)) {
            if (month === 1) {
                setYear(year - 1);
                setMonth(12);
            } else {
                setMonth(month - 1);
            }
        }
    };

    const handleNextMonth = () => {
        const maxYear = currentMonth > 10 ? currentYear + 1 : currentYear;
        const maxMonth = (currentMonth + 2) % 12 || 12;

        if (year < maxYear || (year === maxYear && month < maxMonth)) {
            if (month === 12) {
                setYear(year + 1);
                setMonth(1);
            } else {
                setMonth(month + 1);
            }
        }
    };

    return {
        year,
        month,
        selectedDate,
        setSelectedDate,
        months,
        getDaysInMonth,
        getStartDayOfMonth,
        handlePrevMonth,
        handleNextMonth,
        getFullDaysForMonth,
        fullDaysLoading,
        reloadFullDays, // 🔥 Ahora puedes llamar a esta función cuando necesites recargar los días completos
    };
};
