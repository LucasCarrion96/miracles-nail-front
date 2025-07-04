
export const utils = (
    showAlert,
    artTypes,
    selects,
    state,) => {
    const validateSelections = (totalArtCount) => {
        if (totalArtCount > 10) {
            showAlert(`
                <h3>¡Atención!</h3>
                <p>Te has excedido en el número de diseños: ${totalArtCount}. Ajusta tu selección.</p>`);
            return false;
        }
        if (!selects.horario || !selects.service) {
            showAlert(`
                <h3>¡Atención!</h3>
                <p>No has seleccionado un horario o un servicio. Elige ambas opciones.</p>`);
            return false;
        }
        if (!selects.radioService) {
            showAlert(`
                <h2>¡Atención!</h2>
                <h3>Debes seleccionar entre "Nada"-"Service""</h3>
                <p>Es necesario saber si posees o no un trabajo anterior<p>`);
            return false;
        }
        return true;
    };

    const calculateTotalPrice = (serviceDetails, radioServiceDetails) => {
        return state.nailArtCount * parseFloat(artTypes[0]?.price || 0) +
            state.threeDCount * parseFloat(artTypes[1]?.price || 0) +
            state.caricatureCount * parseFloat(artTypes[2]?.price || 0) +
            parseFloat(serviceDetails.price) +
            parseFloat(radioServiceDetails.price);
    };
    return {
        validateSelections,
        calculateTotalPrice
    }
}