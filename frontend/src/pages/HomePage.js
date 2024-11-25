import React, { useContext } from 'react';
import { UserContext, UserProvider } from '../context/UserContext';

const HomePage = () => {
    const { verify } = useContext(UserContext);
    verify();
    return (
        <div>
            <h1>Bienvenido al sistema</h1>
            <p>Inicio</p>
        </div>
    );
};

export default HomePage;