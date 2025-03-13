import React, { useEffect, useState } from 'react';

export const DateSelector = ({ day, isSunday, isPastDate, isFullDay, onClick, fullDaysLoading }) => {
    // Deshabilitar todos los días si la carga está en progreso
    const isDisabled = isSunday || isPastDate || isFullDay || fullDaysLoading;
    const unavailablseDays = isFullDay || isPastDate || isFullDay || isSunday

    return (
        <>
            <button
                className={`calendar-day numberDay ${isDisabled ? 'sunday' : ''}`}
                disabled={isDisabled}
                onClick={onClick}
            >
                {fullDaysLoading ? 'carga' : day}
            </button>
        </>
    );
};
