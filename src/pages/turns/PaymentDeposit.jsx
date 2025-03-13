import React from 'react'
import { useLocation } from 'react-router-dom';
import './payment.css'
export const PaymentDeposit = () => {
    // Función para crear el pago y obtener la URL de Mercado Pago

    const createPayment = async () => {
        try {
            const response = await fetch('https://tusitio.com/api/mercadopago/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idTurns: turnId }),
            });

            const result = await response.json();
            if (response.ok && result.url) {
                // Si la respuesta es exitosa, redirige al usuario al link de pago de Mercado Pago
                setPaymentUrl(result.url);
            } else {
                // Si hay algún error, muestra un mensaje adecuado
                alert('Error al crear el pago. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error al crear el pago:', error);
            alert('Hubo un problema con la conexión. Intenta nuevamente.');
        }
    }

    const { state } = useLocation();
    const { turnId } = state || {}; // Obtienes el ID del turno desde el state de la navegación

    console.log(turnId);
    const {

        service,
        serviceAdd,
        totalPrice,
        señaPrice,
        turnDay,
        horario,
        nailArtCount,
        threeDCount,
        caricatureCount,
    } = state || {}; // Usa fallback en caso de acceso directo

    return (
        <div className='paymentBody'>
            <h1>Factura del Turno</h1>
            <h1>{turnId}</h1>
            <p>Servicio principal: {service} - ${service?.price}</p>
            <p>Servicio adicional: {serviceAdd?.nameService} - ${serviceAdd?.price}</p>
            <p>Nail Art: {nailArtCount}</p>
            <p>3D: {threeDCount}</p>
            <p>Caricatura: {caricatureCount}</p>
            <p>Fecha: {turnDay} - Horario: 09:0{horario}</p>
            <p><strong>Total: ${totalPrice}</strong></p>
            <p><strong>Seña: ${señaPrice}</strong></p>
        </div>
    );
};
