import { useState } from "react";

export const useAlert = () => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [showSignNowButton, setShowSignNowButton] = useState(false); // State for "Señar Ahora" button
    const [onConfirm, setOnConfirm] = useState(null);
    const [onSignNow, setOnSignNow] = useState(null); // State for the "Señar Ahora" callback

    const showAlert = (message, confirmCallback, signNowCallback, confirmButton, signNowButton) => {
        setAlertMessage(message);
        setShowConfirmButton(confirmButton);
        setShowSignNowButton(signNowButton); // Set visibility for the "Señar Ahora" button
        setOnConfirm(() => confirmCallback);
        setOnSignNow(() => signNowCallback); // Set callback for "Señar Ahora"
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
        setAlertMessage('');
        setShowConfirmButton(false);
        setShowSignNowButton(false); // Reset the visibility of the "Señar Ahora" button
        setOnConfirm(null);
        setOnSignNow(null); // Reset the callback for "Señar Ahora"
    };

    return {
        alertVisible,
        alertMessage,
        showConfirmButton,
        showSignNowButton, // Expose the new property
        showAlert,
        hideAlert,
        onConfirm,
        onSignNow, // Expose the new property
    };
};