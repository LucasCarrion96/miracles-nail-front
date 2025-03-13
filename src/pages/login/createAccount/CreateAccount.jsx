// CreateAccount.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./createUser.css";
import { UserDetails } from "./UserDetails";
import { UserContacts } from "./UserContacts";
import { UserPassword } from "./UserPassword";
import { UserHealthCondition } from "./UserHealthCondition";


export const CreateAccount = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        userName: "",
        userSurname: "",
        phone: "",
        mail: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        showPassword: false
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (formData.mail !== formData.confirmMail) {
            setError("Los correos no coinciden.");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/users/register`, {
                userName: formData.userName,
                userSurname: formData.userSurname,
                birthDate: formData.birthDate,
                phone: formData.phone,
                mail: formData.mail,
                password: formData.password
            });

            console.log("Cuenta creada:", response.data);
            navigate("/iniciar-sesion"); // Redirige al login tras éxito
        } catch (err) {
            console.error("Error al registrar usuario:", err.response || err);
            // Muestra el mensaje que viene del backend, si lo hay
            setError(err.response?.data?.message || "Error al crear la cuenta. Inténtalo de nuevo.");
        }
    };

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 5)); // Asegura que no pase el último paso
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0)); // Asegura que no pase el primer paso
    };

    return (
        <>
            <div className="bgText createAccountBg">
                <div className="createAccountTitle">
                    <h1>Crear Cuenta</h1>
                </div>
                <div className="createAccountContainer">
                    <form className="container createAccount" onSubmit={handleSubmit} style={{ "--step": currentStep }}>
                        {/* Inputs "dummy" ocultos para prevenir autocompletado de Chrome */}
                        <input
                            type="text"
                            name="dummyUsername"
                            style={{ display: "none" }}
                            autoComplete="username"
                        />
                        <input
                            type="password"
                            name="dummyPassword"
                            style={{ display: "none" }}
                            autoComplete="new-password"
                        />
                        {/* Resto de los campos */}
                        <UserDetails className="userDetails"
                            formData={formData} handleChange={handleChange} />
                        <UserContacts className="userDetails"
                            formData={formData} handleChange={handleChange} />
                        <UserHealthCondition className="userDetails" />
                        <UserPassword className="userDetails"
                            formData={formData} handleChange={handleChange} togglePassword={togglePassword} />
                        {error && <p className="text-danger">{error}</p>}

                        <br />
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <button type="button" onClick={prevStep} disabled={currentStep === 0}>
                        Anterior
                    </button>
                    <button type="button" onClick={nextStep} disabled={currentStep === 4}>
                        Siguiente
                    </button><br />
                    <Link to="/iniciar-sesion">Volver al inicio de sesión.</Link>
                </div>
            </div>
        </>
    );
};