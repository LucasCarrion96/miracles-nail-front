import { useReducer } from 'react';

// Estado inicial para los contadores
const initialState = {
    nailArtCount: 0,
    threeDCount: 0,
    caricatureCount: 0,
};

// Reducer que maneja las acciones de incrementar y decrementar
const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT_NAIL_ART":
            return { ...state, nailArtCount: Math.min(state.nailArtCount + 1, 8) };
        case "DECREMENT_NAIL_ART":
            return { ...state, nailArtCount: Math.max(state.nailArtCount - 1, 0) };
        case "INCREMENT_3D":
            return { ...state, threeDCount: Math.min(state.threeDCount + 1, 10) };
        case "DECREMENT_3D":
            return { ...state, threeDCount: Math.max(state.threeDCount - 1, 0) };
        case "INCREMENT_CARICATURE":
            return { ...state, caricatureCount: Math.min(state.caricatureCount + 1, 10) };
        case "DECREMENT_CARICATURE":
            return { ...state, caricatureCount: Math.max(state.caricatureCount - 1, 0) };
        case "RESET":
            // Reiniciar todos los contadores a 0
            return {
                ...state,
                nailArtCount: 0,
                threeDCount: 0,
                caricatureCount: 0
            };
        default:
            return state;
    }
};

export const useCounter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch };
};
