import { CalendarDays } from 'lucide-react';
import { CustomSelect } from "@components/select";

export const UserBirthday = ({ formData, handleChange }) => {
    const options = [
        { value: '1', label: 'Enero', maxDay: '31' },
        { value: '2', label: 'Febrero', maxDay: '29' },
        { value: '3', label: 'Marzo', maxDay: '31' },
        { value: '4', label: 'Abril', maxDay: '30' },
        { value: '5', label: 'Mayo', maxDay: '31' },
        { value: '6', label: 'Junio', maxDay: '30' },
        { value: '7', label: 'Julio', maxDay: '31' },
        { value: '8', label: 'Agosto', maxDay: '31' },
        { value: '9', label: 'Septiembre', maxDay: '30' },
        { value: '10', label: 'Octubre', maxDay: '31' },
        { value: '11', label: 'Noviembre', maxDay: '30' },
        { value: '12', label: 'Diciembre', maxDay: '31' }
    ];

    return (
        <>
            <div className="user-birthday">
                <div className="form-group">
                    <h2 className="subtitle">Fecha de Nacimiento</h2>
                    <div className="date-picker-container">
                        <input
                            placeholder="Día"
                            type="text"
                            className="input-form"
                            name="birthDay"
                            id="birthDay"
                            value={formData.birthDay || ""}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // solo números
                                if (value.length <= 2) {
                                    // obtener mes actual
                                    const selectedMonth = options.find(opt => opt.value === formData.birthMonth);
                                    const maxDay = selectedMonth ? parseInt(selectedMonth.maxDay, 10) : 31;

                                    // corregir si supera el máximo
                                    if (parseInt(value, 10) > maxDay) {
                                        value = String(maxDay);
                                    }

                                    handleChange({ target: { name: "birthDay", value } });
                                }
                            }}
                            required
                            maxLength={2}
                        />

                        <CustomSelect
                            options={options}
                            value={options.find(option => option.value === formData.birthMonth) || null}
                            placeholder="Mes"
                            name="birthMonth"
                            id="birthMonth"
                            onChange={(selected) =>
                                handleChange({ target: { name: 'birthMonth', value: selected.value } })
                            }
                        />
                        <input
                            placeholder="Año"
                            type="text"
                            className="input-form"
                            name="birthYear"
                            id="birthYear"
                            value={formData.birthYear || ""}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // solo números

                                if (value.length <= 4) {
                                    // 🔹 Validar los 2 primeros dígitos
                                    if (value.length >= 2) {
                                        const firstTwo = parseInt(value.slice(0, 2), 10);
                                        if (firstTwo < 19) {
                                            value = "19"; // si empiezan con 18, 17, etc → autocorrige a "19"
                                        } else if (firstTwo > 20) {
                                            value = "20"; // forzar máximo 2099
                                        }
                                    }

                                    handleChange({ target: { name: "birthYear", value } });
                                }
                            }}
                            required
                            maxLength={4}
                        />
                    </div>
                    <p className="info-text">
                        Nota: Debes ser mayor de 16 años para crear una cuenta.
                    </p>
                </div>
            </div>

        </>
    )
}
