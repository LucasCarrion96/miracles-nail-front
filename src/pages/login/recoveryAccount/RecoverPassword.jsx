// RecoverPassword.jsx
import { useState } from "react";
import axios from "axios";

export const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/auth/recover", { email });
        setSent(true);
    };

    return (
        <><div className="bgText loginBg" style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar código</button>
                {sent && <p>Revisa tu correo</p>}
            </form>
        </div>
        </>
    );
}
