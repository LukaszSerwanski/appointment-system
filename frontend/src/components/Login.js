import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            // Pomyślne logowanie - przekierowanie do kalendarza
            navigate("/admin-calendar");
        } else {
            // Ustawienie błędu
            setError("Nieprawidłowy login lub hasło");
        }
    };

    return (
        <div className="login-container">
            <h2>Logowanie Administratora</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    );
};

export default Login;
