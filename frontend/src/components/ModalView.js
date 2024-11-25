import React, { useState, useEffect } from "react";
import "../styles/ModalCancel.css";
import axios from "axios";
import AttachmentBlock from "./AttachmentBlock";
import CommentBlock from "./CommentBlock";

const ModalView = ({ requirementId, setModal, fullName }) => {
    const [requirement, setRequirement] = useState({
        name: '',
        type: '',
        category: '',
        status: '',
        priority: '',
        subject: '',
        description: '',
        owner: '',
        created_at: '',
        creator: '',
    });

    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const fetchDataById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/requirement/" + id);
            setRequirement({
                name: response.data[0].name,
                subject: response.data[0].subject,
                description: response.data[0].description,
                created_at: formatDate(response.data[0].created_at),
                priority: await fetchPriorityById(response.data[0].priority_id),
                type: await fetchTypeById(response.data[0].category_id),
                category: await fetchCategoryById(response.data[0].category_id),
                status: 'Abierto',
            });
        } catch (error) {
            console.error("Error buscando el requerimiento:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPriorityById = async (id) => {
        try {
            const response = await axios.get("http://localhost:3000/priority/" + id);
            return response.data[0].description;
        } catch (error) {
            console.error("Error buscando la prioridad:", error);
        }
    };

    const fetchCategoryById = async (id) => {
        try {
            const response = await axios.get("http://localhost:3000/category/" + id);
            return response.data[0].description;
        } catch (error) {
            console.error("Error buscando la categoria:", error);
        }
    };

    const fetchTypeById = async (id) => {
        try {
            const responseCategory = await axios.get("http://localhost:3000/category/" + id);
            let requirementType_code = responseCategory.data[0].requirementType_code;
            const response = await axios.get("http://localhost:3000/type/" + requirementType_code);
            return response.data[0].description;
        } catch (error) {
            console.error("Error buscando el tipo:", error);
        }
    };

    useEffect(() => {
        fetchDataById(requirementId);
    }, [requirementId]);
    // console.log(requirement)

    if (loading) {
        return (
            <div className="modalCancel">
                <div className="modalCancel-content">
                    <p>Cargando datos del requerimiento...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modalCancel">
            <div className="modalCancel-content">
                <button className="crossCloseButton" onClick={() => setModal(false)}>×</button>
                <h2 className="modalTitle">{requirement.name}</h2>
                <p className="modalItem"><strong>Tipo:</strong> {requirement.type}</p>
                <p className="modalItem"><strong>Categoría:</strong> {requirement.category}</p>
                <p className="modalItem"><strong>Estado:</strong> {requirement.status}</p>
                <p className="modalItem"><strong>Prioridad:</strong> {requirement.priority}</p>
                <p className="modalItem"><strong>Usuario Emisor:</strong> {fullName}</p>
                <p className="modalItem"><strong>Fecha de Creación:</strong> {requirement.created_at}</p>
                <p className="modalItem"><strong>Asunto:</strong> {requirement.subject}</p>
                <p className="modalItem"><strong>Descripción:</strong> {requirement.description}</p>
                <p className="modalItem"><strong>Archivos:</strong></p>
                <AttachmentBlock id={requirementId} />
                <p className="modalItem"><strong>Usuario Propietario:</strong> {fullName}</p>
                <p className="modalItem"><strong>Comentarios:</strong></p>
                <CommentBlock id={requirementId} />
            </div>
        </div>
    );
};

export default ModalView;
