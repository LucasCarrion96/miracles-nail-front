import Select from 'react-select';
import './form-style.css';

const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: '#F6C1D9',
        borderColor: '#2B2B2B',
        boxShadow: '0px 5px 5px 5px rgba(0, 0, 0, 0.329)',
        '&:hover': { borderColor: '#2B2B2B' },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isDisabled
            ? '#2B2B2B' // fondo gris para deshabilitados
            : state.isSelected
                ? '#D96A8B'    // fondo para seleccionados
                : state.isFocused
                    ? '#F6C1D9'    // fondo al hacer hover
                    : '',   // fondo normal
        color: state.isDisabled
            ? '#999'    // texto gris para deshabilitados
            : state.isSelected
                ? '#FAFAFA'
                : '#000',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        transition: ' 0.6s ease',
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: '#555', // color de la flecha
        padding: '4px',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
        '&:hover': {
            color: '#000',
        },
    }),
};

export const CustomSelect = ({ options, value, onChange, placeholder = "Selecciona una opción" }) => {
    return (
        <Select
            options={options}
            value={options.find(op => op.value === value)}
            onChange={onChange}
            styles={customStyles}
            isSearchable={false}
            placeholder={placeholder}
            className="custom-select"
        />
    );
}
