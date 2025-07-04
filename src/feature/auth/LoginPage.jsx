import { useContext, useState } from "react";
import { LangContext } from "../../context/contextLang/LangContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
//import "../../components/form/form-style.css"; // Asegúrate de que la ruta sea correcta
//import "../../styles/loginStyle.css";
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
        < >
            <form className="login bg-pink" onSubmit={handleLogin}>
                <div className="login-title">
                    <h1 className="title">Inicia Sesión Para Continuar</h1>
                </div>

                {/* Campo de Correo */}
                <div className="form-group ">
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
                        autoComplete="username" // Indica que es el usuario para login
                    />
                </div>

                {/* Campo de Contraseña */}
                <div className="form-group ">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input-form"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password" // Indica que es la contraseña actual
                    />
                </div>

                {/* Checkbox para ver/ocultar contraseña */}
                <div className="login-control">
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
                <div>
                    {/* Enlaces */}
                    <Link className="small-text" to="/iniciar-sesion/crear-cuenta">Crear Cuenta</Link>
                    <br />
                    <Link className="small-text" to="/iniciar-sesion/recuperar-password">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>                <br />

                {/* Botón de ingreso */}
                <button type="submit" className="btn btn-primary">
                    Ingresar
                </button>
            </form>
        </>
    );
};
