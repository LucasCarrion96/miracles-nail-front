
import { useNavigate } from 'react-router-dom';
import { useConfirmData } from './useConfirmData';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { utils } from './utils';

export const useSubmitConfirm = (showAlert, hideAlert, apiUrl, selectedDate, services, artTypes, selects, state, reloadFullDays) => {
    //contexto
    const { user } = useContext(AuthContext);
    //validacion y caluclod e precio

    const { validateSelections, calculateTotalPrice } = utils(showAlert, artTypes, selects, state,
    );
    const [turnId, setTurnId] = useState()
    const [modalSignalClose, setmodalSignalClose] = useState(false)
    const navigate = useNavigate();
    const { confirmData } = useConfirmData(user, showAlert, apiUrl, selects, selectedDate, state)
    const handleSubmit = async (e) => {

        e.preventDefault();
        const selectedDateFormatted = selectedDate ? selectedDate.toLocaleDateString().split('T')[0] : 'No seleccionada';
        const serviceDetails = services.find(s => s.idService === parseInt(selects.service)) || { name: 'No seleccionado', price: '0' };
        const radioServiceDetails = services.find(s => s.idService === parseInt(selects.radioService)) || { name: 'nada', price: '0' };

        const totalArtCount = state.nailArtCount + state.threeDCount + state.caricatureCount;
        if (!validateSelections(totalArtCount)) return;

        const totalPrice = calculateTotalPrice(serviceDetails, radioServiceDetails);
        const señaPrice = totalPrice * 0.25;

        const resumen = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Servicios</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>${serviceDetails.nameService}</td><td>${serviceDetails.price} $</td></tr>
                <tr><td>Nail Art x ${state.nailArtCount}</td><td>${state.nailArtCount * parseFloat(artTypes[0]?.price || 0)} $</td></tr>
                <tr><td>3D x ${state.threeDCount}</td><td>${state.threeDCount * parseFloat(artTypes[1]?.price || 0)} $</td></tr>
                <tr><td>Caricatura x ${state.caricatureCount}</td><td>${state.caricatureCount * parseFloat(artTypes[2]?.price || 0)} $</td></tr>
                <tr><td colspan="1" style="text-align: right;"><strong>Service/retiro</strong></td><td><strong>${radioServiceDetails.nameService}: ${radioServiceDetails.price}$</strong></td></tr>
                <tr><td colspan="1" style="text-align: right;"><strong>Total:${totalPrice}$</strong></td><td><strong>Seña:${señaPrice}$</strong></td></tr>
                <tr><td colspan="1" style="text-align: right;"><strong>Horario:09:0${selects.horario}</strong></td><td><strong>fecha:${selectedDateFormatted}</strong></td></tr>
            </tbody>
        </table>
    `;

        // Función para manejar la reserva
        const handleReserve = async () => {
            const success = await confirmData(apiUrl); // Llama a confirmData para reservar
            console.log('Resultado de la reserva:', success); // Log del resultado
            if (success && success.idTurns) {
                const turnId = success.idTurns; // Suponiendo que el éxito de la respuesta contiene el ID del turno
                setTurnId(turnId); // Almacena el ID en el state del componente
                console.log('Turno ID:', turnId);
                hideAlert(); // Oculta la alerta solo si la reserva fue exitosa
                setmodalSignalClose(true);
                reloadFullDays();

            }
        };

        // Función para manejar la seña
        const handleSignNow = async () => {
            const success = await confirmData(apiUrl);
            console.log('datos de confirm data', success)
            const turnId = success?.idTurns || null; // Proporciona un valor predeterminado si idTurns no existe
            console.log('Resultado de la seña:', success);
            if (turnId) {
                hideAlert();
                navigate('/pagar-seña', {
                    state: {
                        turnId: turnId,
                        service: serviceDetails.nameService,
                        serviceAdd: radioServiceDetails,
                        totalPrice: totalPrice,
                        señaPrice: señaPrice,
                        turnDay: selectedDateFormatted,
                        horario: selects.horario,
                        nailArtCount: state.nailArtCount,
                        threeDCount: state.threeDCount,
                        caricatureCount: state.caricatureCount,
                    },
                });
            } else {
                showAlert('Ocurrió un error al enviar los datos. Verifica tu conexión a Internet.', null, false);
            }
        };
        // Muestra la alerta con ambos botones
        showAlert(resumen, handleReserve, handleSignNow, true, true); // Muestra ambos botones
    };

    return {
        handleSubmit, modalSignalClose, setmodalSignalClose
    }

}

/*navigate('/pagar-seña', {
    state: {
        turnId: turnId,
        service: serviceDetails.nameService,
        serviceAdd: radioServiceDetails,
        totalPrice: totalPrice,
        señaPrice: señaPrice,
        turnDay: selectedDateFormatted,
        horario: selects.horario,
        nailArtCount: state.nailArtCount,
        threeDCount: state.threeDCount,
        caricatureCount: state.caricatureCount,
    },*/