export const useConfirmData = (user, showAlert, apiUrl, selects, selectedDate, state) => {
    const confirmData = async () => {
        try {
            const requestBody = {
                idService: selects.service,
                idServiceAdd: selects.radioService,
                horario: selects.horario,
                turnDay: selectedDate, // Asegúrate de que la fecha esté bien formateada
                totalPrice: 200, // Verifica que se calcule correctamente
                nailArtCount: state.nailArtCount,
                threeDCount: state.threeDCount,
                caricatureCount: state.caricatureCount,
                idUser: user.idUser
            };

            console.log("Datos a enviar:", requestBody); // Verifica los datos

            const response = await fetch(`${apiUrl}/turns/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();
            if (response.ok) {
                showAlert(`Reserva exitosa!!!`);
                return result; // Si la respuesta es exitosa
            } else {
                showAlert(`Error: ${result.message}`, null, false); // Muestra error si no es exitoso
                return false;
            }
        } catch (error) {
            console.error("Error al confirmar datos:", error);
            showAlert('Error al enviar los datos. Verifica tu conexión.', null, false);
            return false;
        }
    };
    return { confirmData }
}