import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/HomePage.css';
import ModalView from '../components/ModalView';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
    const { verify, userId } = useContext(UserContext);
    useEffect(() => {
        verify();
    }, []);

    const [requirements, setRequirements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchType, setSearchType] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedRequirementId, setSelectedRequirementId] = useState(null);
    const [fullName, setFullName] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const navigate = useNavigate();

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

    useEffect(() => {
        if(userId) {
            fetchRequirements();
        }
    }, [userId, searchTerm, searchCategory, sortOrder, searchType, page]);

    const fetchRequirements = async () => {
        try {
            const response = await axios.get('http://localhost:3000/requirements', {
                params: {
                    user_id: userId,
                    name: searchTerm,
                    category: searchCategory,
                    priority: sortOrder,
                    type: searchType,
                    page: page,
                    limit: 10,
                },
            });
    
            setRequirements(response.data.data);
            setMaxPage(Math.ceil(response.data.total / 10));
            console.log('Total resultados:', response.data.total);
        } catch (error) {
            console.error('Error buscando los requerimientos:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const handleSearchChange = (e) => {
        setPage(1);
        setSearchTerm(e.target.value)
    };
    const handleCategoryChange = (e) => {
        setPage(1);
        setSearchCategory(e.target.value)
    };
    const handleSortOrderChange = (e) => {
        setPage(1);
        setSortOrder(e.target.value)
    };
    const handleTypeChange = (e) => {
        setPage(1);
        setSearchType(e.target.value)
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSearchCategory('');
        setSortOrder('');
        setSearchType('');
        setPage(1);
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
                    fullName={fullName}
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
                        <option value="Solicitud Nueva Hardware">Solicitud Nueva Hardware</option>
                        <option value="Solicitud Reparar Hardware">Solicitud Reparar Hardware</option>
                    </select>
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
                            {requirements.map((req, index) => {
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
        </>
    );
};

export default HomePage;
