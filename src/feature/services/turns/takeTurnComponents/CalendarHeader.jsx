

export const CalendarHeader = ({ month, year, months, handlePrevMonth, handleNextMonth }) => {
    return (
        <header className="turn-header bg-pink">
            <h1 className="turn-title">TURNOS</h1>

            <div className="button-date">
                <button className="bg-light-black date-prev" onClick={handlePrevMonth}>-</button>
                <h1 className="date-text">{months[month - 1]} {year}</h1>
                <button className="bg-light-black date-prox month-date" onClick={handleNextMonth}>+</button>
            </div>
        </header>
    );
};