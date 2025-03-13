import { useContext, useState } from "react";
import { LangContext } from "../../context/contextLang/LangContext";
import "../../styles/loginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
            console.log("Usuario después del login:", response);
            navigate(response.role === "admin" ? "/admin/dashboard" : "/user");
        }
    };

    return (
        <div className="bgText loginBg">
            <form className="container login" onSubmit={handleLogin}>
                <div className="loginTitle">
                    <h1>Inicia Sesión Para Continuar</h1>
                </div>

                {/* Campo de Correo */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username" // Indica que es el usuario para login
                    />
                </div>

                {/* Campo de Contraseña */}
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password" // Indica que es la contraseña actual
                        />
                    </div>
                </div>

                {/* Checkbox para ver/ocultar contraseña */}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPasswordCheckbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label" htmlFor="showPasswordCheckbox">
                        Ver contraseña
                    </label>
                </div>

                {/* Mensaje de error */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Enlaces */}
                <Link to="/iniciar-sesion/crear-cuenta">Crear Cuenta</Link>
                <br />
                <Link to="/iniciar-sesion/recuperar-password">
                    ¿Olvidaste tu contraseña?
                </Link>
                <br />

                {/* Botón de ingreso */}
                <button type="submit" className="btn btn-primary">
                    Ingresar
                </button>
            </form>
        </div>
    );
};
