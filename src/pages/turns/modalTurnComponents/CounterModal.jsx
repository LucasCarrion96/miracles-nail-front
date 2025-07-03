import { Plus, Minus } from 'lucide-react';

const CounterModal = ({ title, count, onIncrement, onDecrement }) => (
    <div className='counter-body-modal'>
        <h2 className='subtitle'>{title}</h2>
        <div className='counter-buttons-modal'>
            <button type="button" className='btn-rounded bg-pink btn-counter' onClick={onDecrement} disabled={count <= 0}>
                <Minus size={12} />
            </button>
            <p className='content-text'>{count}</p>
            <button type="button" className='btn-rounded bg-pink btn-counter' onClick={onIncrement} disabled={count >= 10}>
                <Plus size={12} />
            </button>
        </div>
    </div>
);

export default CounterModal;