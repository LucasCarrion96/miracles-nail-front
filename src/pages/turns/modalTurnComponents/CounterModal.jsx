import React from 'react';

const CounterModal = ({ title, count, onIncrement, onDecrement }) => (
    <div className='counterBodyModal'>
        <h2>{title}</h2>
        <div className='counterButtonsModal'>
            <button type="button" onClick={onDecrement} disabled={count <= 0}>-</button>
            <h3>{count}</h3>
            <button type="button" onClick={onIncrement} disabled={count >= 10}>+</button>
        </div>
    </div>
);

export default CounterModal;