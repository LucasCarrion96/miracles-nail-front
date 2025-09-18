import { useState } from "react";
import { usePostData } from "../../../hooks/api/usePostData";
import "./recover.css";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/alerts/CustomAlert";
import { Link, Navigate } from "react-router-dom";

export const RecoverPassword = () => {
    const [mail, setMail] = useState("");
    const [sent, setSent] = useState(false);
    const [code, setCode] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const sendCode = usePostData("/auth/password-recovery/recover");
    const verifyCode = usePostData("/auth/password-recovery/verify");
    const resetPassword = usePostData("/auth/password-recovery/reset");

    const {
        alertVisible,
        alertMessage,
        showConfirmButton,
        showSignNowButton,
        showAlert,
        hideAlert
    } = useAlert();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendCode.mutate({ mail }, {
            onSuccess: () => {
                localStorage.setItem("recoveryMail", mail);
                setShowModal(true);
                setSent(true);
            }
        });
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();
        verifyCode.mutate({ mail, code }, {
            onSuccess: () => {
                setVerified(true);
            }
        });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showAlert("Las contraseñas no coinciden");
            return;
        }

        resetPassword.mutate({ mail, password }, {
            onSuccess: () => {
                showAlert("Contraseña actualizada con éxito");
                setTimeout(hideAlert, 3000); // Cerrar automáticamente
                Navigate("/iniciar-sesion");
                setShowModal(false);
            }
        });
    };

    return (
        <div className="recover-container">
            <form className="bg-pink send-mail" onSubmit={handleSubmit}>
                <h1 className="title">Recuperacion de cuenta</h1>
                <label htmlFor="email">Ingresa tu Correo</label>
                <input
                    id="email"
                    name="email"
                    className="input-form"
                    placeholder="Correo"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <button className="btn-submit" type="submit" disabled={sendCode.isPending}>
                    {sendCode.isPending ? "Enviando..." : "Enviar código"}
                </button>
                {sendCode.isError && <p className="error">{sendCode.error.message}</p>}
                <Link to="/iniciar-sesion">Volver al inicio de sesión</Link>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {!verified ? (
                            <form onSubmit={handleVerifyCode}>
                                <h3>Verifica tu código</h3>
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Código"
                                />
                                <button type="submit" disabled={verifyCode.isPending}>
                                    {verifyCode.isPending ? "Verificando..." : "Verificar"}
                                </button>
                                {verifyCode.isError && <p className="error">{verifyCode.error.message}</p>}
                                <Link to="/iniciar-sesion">Volver al inicio de sesión</Link>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword}>
                                <h3>Nueva Contraseña</h3>
                                <input
                                    type="password"
                                    placeholder="Contraseña nueva"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Repetir contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button type="submit" disabled={resetPassword.isPending}>
                                    {resetPassword.isPending ? "Guardando..." : "Guardar contraseña"}
                                </button>
                                {resetPassword.isError && <p className="error">{resetPassword.error.message}</p>}
                                <Link to="/iniciar-sesion">Volver al inicio de sesión</Link>
                            </form>
                        )}
                        <button onClick={() => setShowModal(false)} className="close-btn">Cerrar</button>
                    </div>
                </div>
            )}

            {/* 🔔 ALERTA PERSONALIZADA */}
            <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                onClose={hideAlert}
                showConfirmButton={false}
                showSignNowButton={false}
            />

        </div>
    );
};
