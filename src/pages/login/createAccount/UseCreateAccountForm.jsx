import { useState, useContext } from "react";
import { usePostData } from "../../../hooks/usePostData";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../context/contextLang/LangContext";

export const UseCreateAccountForm = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { mutate } = usePostData("users/register");
    const { alertVisible, alertMessage, showAlert, hideAlert } = useAlert();
    const navigate = useNavigate();
    const Lang = useContext(LangContext);

    const [formData, setFormData] = useState({
        userName: "",
        userSurname: "",
        phone: "",
        mail: "",
        confirmMail: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        healthConditions: [],
        otherHealthCondition: "",
        showPassword: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            showAlert("Las contraseñas no coinciden.");
            return;
        }

        if (formData.mail !== formData.confirmMail) {
            showAlert("Los correos no coinciden.");
            return;
        }

        try {
            const emailCheckResponse = await fetch(
                `${apiUrl}/users/check-email?email=${encodeURIComponent(formData.mail)}`
            );
            const emailCheckData = await emailCheckResponse.json();

            if (emailCheckData.message === "El correo ya está registrado") {
                showAlert("El correo ya está registrado. Usa otro.");
                return;
            }

            mutate(
                { ...formData, birthDate: new Date(formData.birthDate).toISOString() },
                {
                    onSuccess: () => navigate("/iniciar-sesion"),
                    onError: () => showAlert("Error al crear la cuenta."),
                }
            );
        } catch (error) {
            showAlert("Error al procesar el formulario.", error.message);
        }
    };

    return { formData, handleChange, togglePassword, handleSubmit, alertVisible, alertMessage, hideAlert };
};