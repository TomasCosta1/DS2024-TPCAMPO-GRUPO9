import React from "react";
import "../styles/ModalCancel.css";

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
        <p className="modalItem"><strong>Usuario Emisor:</strong> PONER USUARIO CON EL CONTEXT</p>
        <p className="modalItem"><strong>Asunto:</strong> {subject}</p>
        <p className="modalItem"><strong>Descripción:</strong> {description}</p>
        <p className="modalItem">
          <strong>Archivos:</strong>{" "}
          {files.map((file) => {
            return file.name + ", ";
          })}
        </p>
        <p className="modalItem">
          <strong>Requerimientos relacionados:</strong>{" "}
          {selectedRequirementsDesc.map((req) => {
            return req + ", ";
          })}
        </p>
        <p className="modalItem"><strong>Usuario Propietario:</strong> PONER USUARIO CON EL CONTEXT</p>
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
