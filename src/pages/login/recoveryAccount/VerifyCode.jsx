// VerifyCode.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const VerifyCode = ({ email }) => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/auth/verify-code", { email, code });
        if (res.data.success) {
            navigate("/new-password", { state: { email } });
        }
    };

    return (
        <>
            <form onSubmit={handleVerify}>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código" />
                <button type="submit">Verificar</button>
            </form>
        </>
    );
}
