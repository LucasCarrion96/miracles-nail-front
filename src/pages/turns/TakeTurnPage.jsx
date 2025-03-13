// Calendar.js
import React from 'react';
import { ModalTurns } from './ModalTurns';
import { useCalendar } from './hooksTurns/useCalendar';
import { CalendarHeader } from './takeTurnComponents/CalendarHeader';
import "../../styles/turnPage.css";
export const TakeTurnPage = () => {

    const {
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
        reloadFullDays } =
        useCalendar();
    //fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
        <>
            <div
                className={` ${fullDaysLoading ? 'showSpiner' : 'hiddenSpiner'}`}
            >
                <h1>Cargando!!!</h1>
            </div>
            <div className="turnBody">
                <CalendarHeader
                    month={month}
                    year={year}
                    months={months}
                    handlePrevMonth={handlePrevMonth}
                    handleNextMonth={handleNextMonth}
                />
                <main>
                    <div className="calendar-container">
                        <div className="calendar-body week">
                            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day, index) => (
                                <h1 key={index} className="calendar-week">{day}</h1>
                            ))}
                        </div>
                        <div className="calendar-body">
                            {Array.from({ length: getStartDayOfMonth(year, month) }).map((_, index) => (
                                <div key={`empty-${index}`} className="calendar-day" />
                            ))}
                            {Array.from({ length: getDaysInMonth(year, month) }).map((_, index) => {
                                const day = index + 1;
                                const dateKey = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
                                const date = new Date(year, month - 1, day);
                                const isSaturday = date.getDay() === 6;
                                const isSunday = date.getDay() === 0;
                                const isPastDate = date < today;
                                const isFullDay = getFullDaysForMonth.some(day => day === dateKey);
                                /*console.log("dateKey:", dateKey);
                                console.log("getFullDaysForMonth:", getFullDaysForMonth);*/

                                return (
                                    <React.Fragment key={`day-${day}`}>
                                        <ModalTurns
                                            month={month}
                                            year={year}
                                            day={day}
                                            selectedDate={selectedDate}
                                            isPastDate={isPastDate}
                                            isSaturday={isSaturday}
                                            isSunday={isSunday}
                                            isFullDay={isFullDay}
                                            fullDaysLoading={fullDaysLoading}
                                            reloadFullDays={reloadFullDays}
                                            setSelectedDate={setSelectedDate}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
