import { X } from 'lucide-react'

const ModalHeader = ({ selectedDate, onClose }) => (
    <div className="modal-turn-header bg-light-black">
        <h1 className='title'>TURNO PARA: {selectedDate ? selectedDate.toLocaleDateString() : 'Selecciona una fecha'}</h1>
        <X
            size={40}
            cursor="pointer"
            type="button"
            onClick={onClose} />
    </div>
);

export default ModalHeader;