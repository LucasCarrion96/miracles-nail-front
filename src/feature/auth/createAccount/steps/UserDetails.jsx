import { CalendarDays } from 'lucide-react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const UserDetails = ({ formData, handleChange }) => {
    // Convertí string (de formData.birthDate) a Date para DatePicker
    const selectedDate = formData.birthDate ? new Date(formData.birthDate) : null;

    const handleDateChange = (date) => {
        // Convertí la fecha a string ISO para que coincida con lo que espera el form
        const isoDate = date ? date.toISOString().split('T')[0] : '';
        handleChange({ target: { name: 'birthDate', value: isoDate } });
    };

    const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
        <button
            type="button"
            onClick={onClick}
            ref={ref}
            className="custom-date-input input-form"
        >
            <span className="custom-date-label">{value || "Fecha de nacimiento"}</span>
            <CalendarDays size={18} className="custom-date-icon" />
        </button>
    ));

    return (
        <div className="user-details">
            <p className='subtitle'>Datos personales</p>

            <div className="form-group">
                <label htmlFor="userName" className="label-form">Nombre</label>
                <input
                    placeholder="Solo un nombre"
                    type="text"
                    className="input-form"
                    name="userName"
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="userSurname" className="label-form">Apellido</label>
                <input
                    placeholder="Solo un apellido"
                    type="text"
                    className="input-form"
                    name="userSurname"
                    id="userSurname"
                    value={formData.userSurname}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthDate" className="label-form">Fecha de nacimiento</label>
                <DatePicker
                    className='input-form'
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    customInput={<CustomDateInput id="birthDate" name="birthDate" />}
                />
            </div>
        </div>
    );
};
