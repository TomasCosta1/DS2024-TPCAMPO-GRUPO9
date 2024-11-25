import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header>
            <div>
                <img src={require('../assets/defaultUser.webp')} alt="User icon" />
                <h2>Nombre de Persona</h2>
            </div>
            <div className='btnLogout'>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </header>
    );
};

export default Header;