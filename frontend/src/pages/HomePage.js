import React, { useContext } from 'react';
import { UserContext, UserProvider } from '../context/UserContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { verify } = useContext(UserContext);
    verify();
    return (
        <div>
            <h1>Bienvenido al sistema</h1>
            <p>Inicio</p>
            <Link to="/profile" >Continuar como invitado</Link>
        </div>
    );
};

export default HomePage;