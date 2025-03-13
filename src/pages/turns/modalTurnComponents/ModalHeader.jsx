import React from 'react';

const ModalHeader = ({ onClose }) => (
    <div className="modalTurnHeader">
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close">x</button>
    </div>
);

export default ModalHeader;