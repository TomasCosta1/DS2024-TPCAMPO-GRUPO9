import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';

const Profile = ({email, pass, verify}) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        verify();
    }, [])

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

    const toggleEditMode = () => {
        navigate("/profileEdit")
    };

    const handleSubmit = async () => {
        /*try {
            const response = await fetch(`http://localhost:3000/profile/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Perfil actualizado correctamente");
                setIsEditing(false);
            } else {
                alert("Error al actualizar el perfil");
            }
        } catch (error) {
            console.error("Error al enviar los datos del perfil:", error);
        }*/
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
                            disabled="true"
                            className="inputProfile"
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
                            name="usuario"
                            value={userData.username}
                            disabled="true"
                            className="inputProfile"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            disabled="true"
                            className="inputProfile"
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
                            onClick={() => navigate("/")}
                        >
                            Volver
                        </button>
                        <button className="edit-button" onClick={toggleEditMode}>
                        Editar
                    </button>
            </div>
        </div>
    );
};

export default Profile;