import React, { useEffect, useState, useContext } from "react";
import "../styles/ReqForm.css";
import axios from "axios";
import Form from "./Form";
import ModalCancel from "./ModalCancel";
import ModalCreate from "./ModalCreate";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ReqForm = () => {
  const [type, setType] = useState("");
  const [typeDescription, setTypeDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityDescription, setPriorityDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectPriority, setSelectPriority] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [selectedRequirementsDesc, setSelectedRequirementsDesc] = useState([]);
  const [modalCancel, setModalCancel] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [validate, setValidate] = useState(false);

  const formRef = React.useRef(null);
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/requirements/${userId}`);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedRequirements((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((reqId) => reqId !== id)
        : [...prevSelected, id]
    );
    
  };

  const handleCheckboxNames = (name) => {
    
    setSelectedRequirementsDesc((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((reqName) => reqName !== name)
        : [...prevSelected, name]
    );
    
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
      user_id: userId,
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

      navigate("/");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
    setModalCreate(false);
  };

  const validateData = () => {
    if (!type || !category || !priority || !subject || !description) {
      setValidate(true);
    } else {
      setValidate(false);
      setModalCreate(true);
    }
  }

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

  useEffect(() => {
    if (modalCancel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalCancel]);

  return (
    <div>
      {modalCancel && <ModalCancel setModalCancel={setModalCancel} />}
      {modalCreate && (
        <ModalCreate
          validateData={validateData}
          handleFormSubmit={handleFormSubmit}
          typeDescription={typeDescription}
          categoryDescription={categoryDescription}
          priorityDescription={priorityDescription}
          subject={subject}
          description={description}
          files={files}
          selectedRequirementsDesc={selectedRequirementsDesc}
          setModalCreate={setModalCreate}
        />
      )}
      <div>
        <h3 className="title">Nuevo Requerimiento</h3>
        <Form
          submitReq={submitReq}
          type={type}
          setType={setType}
          setTypeDescription={setTypeDescription}
          selectType={selectType}
          setCategory={setCategory}
          setCategoryDescription={setCategoryDescription}
          filteredCategories={filteredCategories}
          setPriority={setPriority}
          setPriorityDescription={setPriorityDescription}
          selectPriority={selectPriority}
          setFiles={setFiles}
          files={files}
          setSubject={setSubject}
          setDescription={setDescription}
          setModalCancel={setModalCancel}
          setModalCreate={setModalCreate}
          requirements={requirements}
          formatDate={formatDate}
          selectedRequirements={selectedRequirements}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckboxNames={handleCheckboxNames}
          validateData={validateData}
          validate={validate}
          formRef={formRef}
        />
      </div>
      
    </div>
  );
};

export default ReqForm;
