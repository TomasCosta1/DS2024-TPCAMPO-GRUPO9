import React from "react";
import "../styles/ReqForm.css";
import RelatedReq from "./RelatedReq";

const Form = ({
  submitReq,
  type,
  setType,
  setTypeDescription,
  selectType,
  setCategory,
  setCategoryDescription,
  filteredCategories,
  setPriority,
  setPriorityDescription,
  selectPriority,
  setFiles,
  files,
  setSubject,
  setDescription,
  setModalCancel,
  requirements,
  formatDate,
  selectedRequirements,
  handleCheckboxChange,
  validateData,
  handleCheckboxNames,
  validate,
  formRef,
  page,
  setPage,
  maxPage,
}) => {
  return (
    <form className="form" ref={formRef} onSubmit={submitReq}>
      <div className="row">
        <section className="inputSection">
          <label htmlFor="type" className="labels">
            Tipo Requerimiento <span className="redDot">*</span>
          </label>
          <select
            id="type"
            name="type"
            className="inputs"
            onChange={(e) => {
              setType(e.target.value);
              setTypeDescription(e.target.options[e.target.selectedIndex].text);
            }}
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
            Categoria <span className="redDot">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="inputs"
            onChange={(e) => {
              setCategory(e.target.value);
              setCategoryDescription(
                e.target.options[e.target.selectedIndex].text
              );
            }}
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
            Prioridad <span className="redDot">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            className="inputs"
            onChange={(e) => {
              setPriority(e.target.value);
              setPriorityDescription(
                e.target.options[e.target.selectedIndex].text
              );
            }}
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
            Asunto <span className="redDot">*</span>
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
            Descripción <span className="redDot">*</span>
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
                alert(`Solo puedes subir un máximo de ${maxFiles} archivos.`);
                e.target.value = "";
                return;
              }
              const fileDetails = Array.from(e.target.files).map((file) => ({
                name: file.name,
                size: file.size,
              }));
              setFiles(fileDetails);
            }}
            multiple
          />
          <section className="inputFileBtn">
            <button
              type="button"
              className="file-button"
              onClick={() => document.getElementById("files").click()}
            >
              Seleccionar archivos
            </button>
            {files.length > 0 && (
              <span className="cant">
                {files.length} archivo/s seleccionado/s
              </span>
            )}
          </section>
        </section>
      </div>
      {validate && <p className="alert">Por favor complete todos los campos</p>}
      <div className="tableDivContainer">
        <div className="tableDiv">
        <RelatedReq
          requirements={requirements}
          formatDate={formatDate}
          selectedRequirements={selectedRequirements}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckboxNames={handleCheckboxNames}
        />
        </div>
        <div className='paginationDiv'>
                    <button
                    className='buttonPag'
                    type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            if (page === 1) return;
                                setPage(page - 1);
                        }}
                    >
                        Página anterior
                    </button>
                    <p>Página: {page}</p>
                    <button
                    className='buttonPag'
                    type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            if (page === maxPage) return;
                                setPage(page + 1);
                        }}
                    >
                        Siguiente página
                    </button>
                </div>
      </div>

      <div className="rowBtn">
        <section className="inputSection">
          <button
            type="button"
            className="cancelButton"
            onClick={(e) => {
              e.preventDefault();
              setModalCancel(true);
            }}
          >
            Cancelar
          </button>
        </section>
        <section className="inputSection">
          <button
            type="button"
            className="createButton"
            onClick={(e) => {
              e.preventDefault();
              validateData();
            }}
          >
            Crear
          </button>
        </section>
      </div>
    </form>
  );
};

export default Form;
