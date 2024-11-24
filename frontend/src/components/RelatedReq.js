import React from "react";
import "../styles/ReqForm.css";

const RelatedReq = ({
  requirements,
  formatDate,
  selectedRequirements,
  handleCheckboxChange,
  handleCheckboxNames,
}) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Nombre</th>
            <th>Prioridad</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Fecha de Creación</th>
            <th>Estatus</th>
            <th>Asunto</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req, index) => {
            const formattedDate = formatDate(req.created_at);
            return (
              <tr key={req.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRequirements.includes(req.id)}
                    onChange={() => {
                      handleCheckboxChange(req.id);
                      
                      handleCheckboxNames(req.name);
                    }}
                  /> 
                </td>
                <td>{req.name}</td>
                <td>{req.priority}</td>
                <td>{req.type}</td>
                <td>{req.category}</td>
                <td>{formattedDate}</td>
                <td>{req.status}</td>
                <td>{req.subject}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RelatedReq;
