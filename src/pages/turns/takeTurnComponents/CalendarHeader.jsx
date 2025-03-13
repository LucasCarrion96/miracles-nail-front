

export const CalendarHeader = ({ month, year, months, handlePrevMonth, handleNextMonth }) => {
    return (
        <header className="turnHeader">
            <h1 className="turnTitle">TURNOS</h1>
            <h1 className="dateText">{months[month - 1]} {year}</h1>
            <div className="buttonDate">
                <button className="datePrev" onClick={handlePrevMonth}>-</button>
                <button className="dateProx monthDate" onClick={handleNextMonth}>+</button>
            </div>
        </header>
    );
};