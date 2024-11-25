import React, { useContext, useEffect, useState } from 'react';
import '../styles/Header.css';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { userId, clearUser } = useContext(UserContext);
    const [fullName, setFullName] = useState('');
    const [imgProfile, setImgProfile] = useState('');

    const fetchFullName = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`);
            const data = await response.json();
            setFullName(data[0].name + ' ' + data[0].lastname);
            setImgProfile(data[0].photo);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    fetchFullName();
    
    return (
        <header>
            <div>
                <img src={imgProfile} alt="User icon" className='imgProfile'/>
                <Link to='/profile'> <h2>{fullName}</h2> </Link>
                
            </div>
            <div className='btnLogout' onClick={clearUser}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </header>
    );
};

export default Header;