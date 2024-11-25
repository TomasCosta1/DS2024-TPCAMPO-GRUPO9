import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = ({email, pass, handleEmail, handlePass}) => {
  const { verify } = useContext(UserContext);
  verify();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/login/${email}/${pass}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json()
            console.log(data);
            

            if (data.success) {
                handleEmail(userData.email)
                handlePass(userData.password)
                navigate("/profile")
            }

            
        } catch (error) {
            console.error("Error al enviar los datos del perfil:", error);
        }
    };


    return (
        <div className="profile-container">
            <div className="profile-image">
                <img
                    src={userData.photo || "https://via.placeholder.com/100"}
                    alt="Perfil"
                />
            </div>
            <div className="profile-fields">      
                    <div className="profile-field">
                        <label>Nombre</label>
                        <input
                            name="name"
                            value={userData.name}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Apellido</label>
                        <input
                            name="lastname"
                            value={userData.lastname}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="inputProfileActive"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Empresa</label>
                        <input
                            name="company"
                            value={userData.company}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
                    <div className="profile-field">
                        <label>CUIL</label>
                        <input
                            name="cuil"
                            value={userData.cuil}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Usuario</label>
                        <input
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            className="inputProfileActive"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Password</label>
                        <input
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            className="inputProfileActive"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Descripción</label>
                        <input
                            name="description"
                            value={userData.description}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
            </div>
            <div className="profile-actions">
                        <button
                            className="cancel-button"
                            onClick={() => navigate("/profile")}
                        >
                            Cancelar
                        </button>
                        <button className="confirm-button" onClick={handleSubmit}>
                            Confirmar
                        </button>
            </div>
        </div>
    );
};

export default Profile;