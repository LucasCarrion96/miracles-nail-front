import { useContext, useState } from "react";
import { LangContext } from "../../context/contextLang/LangContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@components/button/icon-button/IconButton";

import "../../styles/loginStyle.css";

export const LoginPage = () => {
    const Lang = useContext(LangContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const response = await login(email, password);

        if (response?.error) {
            setError(response.error);
        } else {
            navigate(response.role === "admin" ? "/admin/dashboard" : "/user");
        }
    };

    return (
        <>
            <form className="login bg-pink" onSubmit={handleLogin}>
                <div className="login-title">
                    <h1 className="title">Inicia Sesión Para Continuar</h1>
                </div>

                {/* Campo de Correo */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="input-form"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>

                {/* Campo de Contraseña con ícono */}
                <div className="form-group password-group">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-form"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <IconButton
                            size="30"
                            className="toggle-password"
                            handleClick={() => setShowPassword(!showPassword)}
                            icon={showPassword ? "EyeClosed" : "Eye"}
                        />


                    </div>
                </div>

                {/* Mensaje de error */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Enlaces */}
                <div>
                    <Link className="small-text" to="/iniciar-sesion/crear-cuenta">
                        Crear Cuenta
                    </Link>
                    <br />
                    <Link className="small-text" to="/iniciar-sesion/recuperar-password">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <br />

                {/* Botón de ingreso */}
                <button type="submit" className="btn btn-primary">
                    Ingresar
                </button>
            </form>
        </>
    );
};