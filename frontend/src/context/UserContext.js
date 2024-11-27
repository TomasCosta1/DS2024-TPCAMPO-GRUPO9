import React, { createContext, useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

export const UserContext=createContext()

export const UserProvider=({children}) => {
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleUser = (prop) => {
        setUser(prop);
    }

    const handleEmail = (prop) => {
        setEmail(prop);
    }

    const handleUserId = (prop) => {
        setUserId(prop);
    }

    const verify = async () => {
            const loginData = {
                email: email
            };
            
            
            
        if (loginData.email != "") {
            try {
                
                const response = await fetch(`http://localhost:3000/login/${loginData.email}`, {
                    method: 'GET'
                });
                
                const data = await response.json();
                
                
                if (data.success) {
                    handleUserId(data.id)
                } else {
                    navigate("/login")
                }
            } catch (error) {
                console.error("Error:", error);
                navigate("/login")
            }
        }else{
            navigate("/login")
        }
            
    }

    const clearUser = () => {
        setEmail('');
        setUserId('');
        navigate('/login');
    }

    return (
        <UserContext.Provider
          value={{
            user,
            userId,
            email,
            handleUser,
            handleEmail,
            handleUserId,
            verify,
            clearUser
          }}
        >
            {children}
        </UserContext.Provider>
      );
}