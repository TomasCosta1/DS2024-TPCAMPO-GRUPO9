import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/HomePage.css';
import ModalView from '../components/ModalView';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
    const { verify } = useContext(UserContext);
    useEffect(() => {
        verify();
    }, []);

    const [requirements, setRequirements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchType, setSearchType] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedRequirementId, setSelectedRequirementId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchRequirements();
    }, []);

    const fetchRequirements = async () => {
        try {
            const response = await axios.get("http://localhost:3000/requirements");
            setRequirements(response.data);
        } catch (error) {
            console.error("Error buscando los requerimientos:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setSearchCategory(e.target.value);
    const handleDateChange = (e) => setSearchDate(e.target.value);
    const handleSortOrderChange = (e) => setSortOrder(e.target.value);
    const handleTypeChange = (e) => setSearchType(e.target.value);

    const filteredRequirements = requirements.filter((requirement) => {
        return (
            (requirement.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
            (requirement.category.toLowerCase().includes(searchCategory.toLowerCase()) || searchCategory === '') &&
            (requirement.created_at.includes(searchDate) || searchDate === '') &&
            (requirement.priority.toLowerCase().includes(sortOrder.toLowerCase()) || sortOrder === '') &&
            (requirement.type.toLowerCase().includes(searchType.toLowerCase()) || searchType === '')
        );
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSearchCategory('');
        setSearchDate('');
        setSortOrder('');
        setSearchType('');
    };

    const openModal = (id) => () => {
        setSelectedRequirementId(id);
        setModal(true);
    };
    return (
        <>
            {modal && (
                <ModalView
                    requirementId={selectedRequirementId}
                    setModal={setModal}
                />
            )}
            <Header />
            <div className="homePage">
                <h1>Requerimientos</h1>
                <form className='filter' onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Buscar por codigo..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="" disabled selected>Prioridad</option>
                        <option value="Urgente">Urgente</option>
                        <option value="Alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    <select value={searchType} onChange={handleTypeChange}>
                        <option value="" disabled selected>Tipo</option>
                        <option value="Requerimiento Software">Requerimiento Software</option>
                        <option value="Requerimiento Hardware">Requerimiento Hardware</option>
                    </select>
                    <select value={searchCategory} onChange={handleCategoryChange}>
                        <option value="" disabled selected>Categoría</option>
                        <option value="Implementar funcionalidad">Implementar funcionalidad</option>
                        <option value="Reparar Programa">Reparar Programa</option>
                        <option value="Postre">Postre</option>
                        <option value="Bebida">Bebida</option>
                    </select>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={handleDateChange}
                    />
                    <button className='btnDefault' type="button" onClick={() => { clearFilters() }}>Limpiar filtros</button>
                    <button className='confirmBtn' type="button" onClick={() => { navigate('/newReq') }}>Nuevo Req.</button>
                </form>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Prioridad</th>
                                <th>Tipo</th>
                                <th>Categoría</th>
                                <th>Fecha de Creación</th>
                                <th>Estado</th>
                                <th>Asunto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequirements.map((req, index) => {
                                const formattedDate = formatDate(req.created_at);
                                return (
                                    <tr key={req.id} onClick={openModal(req.id)}>
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
        </>
    );
};

export default HomePage;
