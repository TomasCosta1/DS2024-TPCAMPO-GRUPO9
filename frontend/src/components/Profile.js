import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = ({ handleUser, handleEmail, handlePass }) => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Obtener los datos del usuario con ID 1
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user/id");
                const data = await response.json();
                setUserData(data);
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
        setIsEditing(!isEditing);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/id", {
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
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-image">
                <img
                    src={userData.imagen || "https://via.placeholder.com/100"}
                    alt="Perfil"
                />
            </div>
            <div className="profile-fields">
                {[
                    { label: "Nombre", name: "nombre" },
                    { label: "Apellido", name: "apellido" },
                    { label: "Correo", name: "correo" },
                    { label: "Empresa", name: "empresa" },
                    { label: "CUIL", name: "cuil" },
                    { label: "Usuario", name: "usuario" },
                    { label: "Descripción", name: "descripcion" },
                    { label: "Contraseña", name: "password", type: "password" },
                ].map((field, index) => (
                    <div className="profile-field" key={index}>
                        <label>{field.label}</label>
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={userData[field.name] || ""}
                            disabled={!isEditing || !!userData[field.name]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
            </div>
            <div className="profile-actions">
                {!isEditing ? (
                    <button className="edit-button" onClick={toggleEditMode}>
                        Editar
                    </button>
                ) : (
                    <>
                        <button
                            className="cancel-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancelar
                        </button>
                        <button className="confirm-button" onClick={handleSubmit}>
                            Confirmar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;


/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css"; 

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    empresa: "",
    cuil: "",
    usuario: "",
    descripcion: "",
    contraseña: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/1"); // Ajusta la URL según tu backend
        const data = response.data;

        setUserData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          correo: data.correo || "",
          empresa: data.empresa || "",
          cuil: data.cuil || "",
          usuario: data.usuario || "",
          descripcion: data.descripcion || "",
          contraseña: data.contraseña || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    try {
      await axios.put("http://localhost:3001/api/user/1", userData); // Ajusta la URL según tu backend
      console.log("Datos actualizados correctamente.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <div className="profile-image"></div>
      </div>
      <form className="profile-form">
        {["nombre", "apellido", "correo", "empresa", "cuil", "usuario", "descripcion"].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "contraseña" ? "password" : "text"}
              name={field}
              value={userData[field]}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "input-editable" : "input-disabled"}
            />
          </div>
        ))}
        <div className="button-group">
          {isEditing ? (
            <>
              <button type="button" onClick={handleCancel} className="button cancel-button">
                Cancelar
              </button>
              <button type="button" onClick={handleConfirm} className="button confirm-button">
                Confirmar
              </button>
            </>
          ) : (
            <button type="button" onClick={toggleEditMode} className="button edit-button">
              Editar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;*/
