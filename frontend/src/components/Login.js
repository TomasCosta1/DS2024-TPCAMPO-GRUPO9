import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleUser, handleEmail, handlePass }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const checkData = async (e) => {
        e.preventDefault();

        const loginData = {
            email: form.email,
            pass: form.password
        };

        try {
            const response = await fetch(`http://localhost:3000/login/${loginData.email}/${loginData.pass}`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.success) {
                handleUser(data.name);
                handleEmail(loginData.email);
                handlePass(loginData.pass);
                navigate("/");
            } else {
                toast.error('Credenciales inválidas.', { theme: "colored" });
            }
        } catch (error) {
            toast.error('Error en el servidor. Intente nuevamente.', { theme: "colored" });
        }
    };

    return (
        <div className="login-background">
            <div className="login-card">
                <h1 className="login-title">ReqTrack</h1>
                <form onSubmit={checkData} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Usuario/Correo"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;