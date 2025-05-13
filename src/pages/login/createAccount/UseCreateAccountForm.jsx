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
    const validationDetails = () => {
        //Validaciond e datos personales
        if (!formData.userName || !formData.userSurname) {
            showAlert("Por favor completá ambos campos de nombre y apellido.");
            return;
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.userName) || !/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.userSurname)) {
            showAlert("El nombre y apellido solo pueden contener letras y espacios.");
            return;
        }
        if (formData.userName.length < 2 || formData.userSurname.length < 2) {
            showAlert("El nombre y apellido deben tener al menos 2 caracteres.");
            return;
        }
        if (formData.userName.length > 20 || formData.userSurname.length > 20) {
            showAlert("El nombre y apellido no pueden tener más de 20 caracteres.");
            return;
        }
        //Edad
        if (!formData.birthDate) {
            showAlert("Por favor completá el campo de fecha de nacimiento.");
            return;
        }
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 16) {
            showAlert("Debes tener al menos 16 años para registrarte.");
            return;
        }
        if (age > 120) {
            showAlert("La edad ingresada no es válida.");
            return;
        }
        return true;
    }

    const validationContacts = async () => {

        //Phone
        if (!/^\d+$/.test(formData.phone)) {
            showAlert("El número de teléfono solo puede contener dígitos.");
            return;
        }
        if (formData.phone.startsWith("0")) {
            showAlert("El número de teléfono no puede comenzar con 0.");
            return;
        }
        if (formData.phone.length < 10 || formData.phone.length > 15) {
            showAlert("El número de teléfono debe tener entre 10 y 15 dígitos.");
            return;
        }

        //Validacion de mail
        if (!formData.mail || !formData.confirmMail) {
            showAlert("Por favor completá ambos campos de correo.");
            return;
        }
        if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(formData.mail)) {
            showAlert("El formato de correo es incorrecto.");
            return;
        }

        if (formData.mail !== formData.confirmMail) {
            showAlert("Los correos no coinciden.");
            return;
        }
        const emailCheckResponse = await fetch(
            `${apiUrl}/users/check-email?email=${encodeURIComponent(formData.mail)}`
        );
        const emailCheckData = await emailCheckResponse.json();

        if (emailCheckData.message === "El correo ya está registrado") {
            showAlert("El correo ya está registrado. Usa otro.");
            return;
        }
        return true
    }

    const validationPassword = () => {

        //Validacio de password
        if (!formData.password || !formData.confirmPassword) {
            showAlert("Campos de contraseña vacios, cree una.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            showAlert("Las contraseñas no coinciden.");
            return;
        }

    }

    const validation = {
        validationDetails,
        validationContacts,
        validationPassword,
    }

    const validateAllSteps = async () => {
        const detailsValid = validation.validationDetails();
        const passwordValid = validation.validationPassword();
        const contactsValid = await validation.validationContacts();

        return detailsValid && passwordValid && contactsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allValid = await validateAllSteps();

        if (!allValid) {
            showAlert("Por favor completá todos los campos correctamente antes de enviar.");
            return;
        }

        try {
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

    return { formData, handleChange, togglePassword, handleSubmit, alertVisible, alertMessage, hideAlert, validation };
};