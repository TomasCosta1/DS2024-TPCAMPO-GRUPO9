import React, {useState, useContext} from "react";
import "../styles/ModalCancel.css";
import { UserContext } from "../context/UserContext";

const ModalCreate = ({
  setModalCreate,
  handleFormSubmit,
  typeDescription,
  categoryDescription,
  priorityDescription,
  subject,
  description,
  files,
  selectedRequirementsDesc,
}) => {
  const [fullName, setFullName] = useState("");
    
    const {userId} = useContext(UserContext);

    const fetchFullName = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`);
            const data = await response.json();
            setFullName(data[0].name + ' ' + data[0].lastname);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    fetchFullName();
  return (
    <div className="modalCancel">
      <div className="modalCancel-content">
        <h2 className="modalTitle">
          ¿Está seguro que desea crear este Requerimiento?
        </h2>
        <p className="modalSubtitle">Esto creará un nuevo Requerimiento.</p>
        <p className="modalItem"><strong>Tipo:</strong> {typeDescription}</p>
        <p className="modalItem"><strong>Categoría:</strong> {categoryDescription}</p>
        <p className="modalItem"><strong>Estado:</strong> Abierto</p>
        <p className="modalItem"><strong>Prioridad:</strong> {priorityDescription}</p>
        <p className="modalItem"><strong>Usuario Emisor:</strong> {fullName}</p>
        <p className="modalItem"><strong>Asunto:</strong> {subject}</p>
        <p className="modalItem"><strong>Descripción:</strong> {description}</p>
        <p className="modalItem">
          <strong>Archivos:</strong>{" "}
          {files.length > 0 ? (files.map((file) => {
            return file.name + ", ";
          })
        ) : (
          "Este requerimiento no tiene ningún archivo."
        )
      }
        </p>
        <p className="modalItem">
          <strong>Requerimientos relacionados:</strong>{" "}
          {selectedRequirementsDesc.length > 0 ? (selectedRequirementsDesc.map((req) => {
            return req + ", ";
          })
        ) : (
          "No hay requerimientos relacionados."
        )
      }
        </p>
        <p className="modalItem"><strong>Usuario Propietario:</strong> {fullName}</p>
        <div className="modalCreate-buttons">
          <button className="cancelBtn" onClick={() => setModalCreate(false)}>
            Cancelar
          </button>
          <button
            className="confirmBtn"
            onClick={() => {
              handleFormSubmit();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
