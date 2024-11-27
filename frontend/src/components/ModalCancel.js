import React from "react";
import "../styles/ModalCancel.css";
import {useNavigate} from "react-router-dom";

const ModalCancel = ({ setModalCancel }) => {
    const navigate = useNavigate();
  return (
    <div className="modalCancel">
      <div className="modalCancel-content">
        <h2 className="modalTitle">
          ¿Está seguro que desea cancelar este Requerimiento?
        </h2>
        <p className="modalSubtitle">
          Esto eliminaría todo lo cargado hasta el momento.
        </p>
        <div className="modal-buttons">
          <button className="blueButton" onClick={() => setModalCancel(false)}>Volver</button>
          <button
          className="cancelButton"
            onClick={() => {
              setModalCancel(false);
                navigate("/");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCancel;
