import { PawPrint } from 'lucide-react';

export const DateSelector = ({ day, isSunday, isPastDate, isFullDay, onClick, fullDaysLoading }) => {
    // Deshabilitar todos los días si la carga está en progreso
    const isDisabled = isSunday || isPastDate || isFullDay || fullDaysLoading;
    const unavailablseDays = isFullDay || isPastDate || isFullDay || isSunday

    return (
        <>
            <button
                className={`number-day ${isDisabled ? 'sunday' : ''}`}
                disabled={isDisabled}
                onClick={onClick}
            >
                {isDisabled ?
                    <PawPrint
                        size={30}
                        color='pink'
                    /> : day}
            </button>

        </>
    );
};
