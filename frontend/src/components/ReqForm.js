import React, { useEffect, useState } from "react";
import "../styles/ReqForm.css";
import axios from "axios";

const ReqForm = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectPriority, setSelectPriority] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  // Función para obtener los requerimientos desde el backend
  const fetchRequirements = async () => {
    try {
      const response = await axios.get("http://localhost:3000/requirements");
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // Función para manejar la selección de requerimientos relacionados
  const handleCheckboxChange = (id) => {
    setSelectedRequirements(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((reqId) => reqId !== id) // Desmarcar
          : [...prevSelected, id] // Marcar
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Devuelve solo la fecha en formato YYYY-MM-DD
  };

  const submitReq = async (e) => {
    e.preventDefault();

    const fileDetails =
      files.length > 0
        ? files.map((file) => ({
            name: file.name,
            size: file.size,
          }))
        : null;
    const relatedReqDetails =
      selectedRequirements.length > 0 ? selectedRequirements : null;

    const requestBody = {
      category_id: category,
      priority_id: priority,
      subject,
      description,
      files: fileDetails,
      relatedReq: relatedReqDetails,
      status_id: 1,
      user_id: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/requirement",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/type");
      const data = await response.json();
      setSelectType(
        data.map((element) => ({
          key: element.code,
          value: element.description,
        }))
      );

      const response2 = await fetch("http://localhost:3000/category");
      const data2 = await response2.json();
      setSelectCategory(
        data2.map((element) => ({
          id: element.id,
          key: element.requirementType_code,
          value: element.description,
        }))
      );

      const response3 = await fetch("http://localhost:3000/priority");
      const data3 = await response3.json();
      setSelectPriority(
        data3.map((element) => ({
          key: element.id,
          value: element.description,
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (type) {
      const selectedType = selectType.find((t) => t.value === type);

      if (selectedType) {
        const relatedCategories = selectCategory.filter(
          (category) => category.key === selectedType.key
        );
        setFilteredCategories(relatedCategories);
      } else {
        setFilteredCategories([]);
      }
    } else {
      setFilteredCategories([]);
    }
  }, [type, selectType, selectCategory]);

  return (
    <div>
      <div>
        <h3 className="title">Nuevo Requerimiento</h3>
        <form className="form" onSubmit={submitReq}>
          <div className="row">
            <section className="inputSection">
              <label htmlFor="type" className="labels">
                Tipo Requerimiento
              </label>
              <select
                id="type"
                name="type"
                className="inputs"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              >
                <option value="">Seleccione un tipo</option>
                {selectType.map((element) => (
                  <option key={element.key} value={element.value}>
                    {element.value}
                  </option>
                ))}
              </select>
            </section>
            <section className="inputSection">
              <label htmlFor="category" className="labels">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="inputs"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Seleccione una categoría</option>
                {filteredCategories.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.value}
                  </option>
                ))}
              </select>
            </section>
          </div>

          <div className="row">
            <section className="inputSection">
              <label htmlFor="priority" className="labels">
                Prioridad
              </label>
              <select
                id="priority"
                name="priority"
                className="inputs"
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Seleccione una prioridad</option>
                {selectPriority.map((element) => (
                  <option key={element.key} value={element.key}>
                    {element.value}
                  </option>
                ))}
              </select>
            </section>
            <section className="inputSection">
              <label htmlFor="subject" className="labels">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="inputs"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </section>
          </div>

          <div className="row">
            <section className="inputSection">
              <label htmlFor="description" className="labels">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                className="inputs"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </section>
            <section className="inputSection">
              <label htmlFor="files" className="labels">
                Archivos
              </label>
              <input
                type="file"
                id="files"
                name="files"
                accept=".pdf,.docx,.xlsx"
                className="inputFile"
                onChange={(e) => {
                  const maxFiles = 5;
                  if (e.target.files.length > maxFiles) {
                    alert(
                      `Solo puedes subir un máximo de ${maxFiles} archivos.`
                    );
                    e.target.value = "";
                    return;
                  }
                  const fileDetails = Array.from(e.target.files).map(
                    (file) => ({
                      name: file.name,
                      size: file.size,
                    })
                  );
                  setFiles(fileDetails);
                }}
                multiple
              />
              <section className="inputFileBtn">
              <button
                className="file-button"
                onClick={() => document.getElementById("files").click()}
              >Seleccionar archivos</button>
              {files.length > 0 && (<span className="cant">{files.length} archivo/s seleccionado/s</span>)}
              </section>
              
            </section>
          </div>
          <div className="row">
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
                            onChange={() => handleCheckboxChange(req.id)}
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
          </div>

          <div className="row">
            <section className="inputSection">
              <button className="cancelButton">Cancelar</button>
            </section>
            <section className="inputSection">
              <button type="submit" className="createButton">
                Crear
              </button>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReqForm;
