import React, { createContext, useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

export const UserContext=createContext()

export const UserProvider=({children}) => {
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleUser = (prop) => {
        setUser(prop);
    }

    const handlePass = (prop) => {
        setPass(prop);
    }

    const handleEmail = (prop) => {
        setEmail(prop);
    }

    const handleUserId = (prop) => {
        setUserId(prop);
    }

    const verify = async () => {
            const loginData = {
                email: email,
                pass: pass
            };
        
            try {
                const response = await fetch(`http://localhost:3000/login/${loginData.email}/${loginData.pass}`, {
                    method: 'GET'
                });
                console.log(loginData);
                
                const data = await response.json();
                console.log(data);
                
        
                if (data.success) {
                    handleUserId(data.user.id)
                } else {
                    navigate("/login")
                }
            } catch (error) {
                console.error("Error:", error);
                navigate("/login")
            }
    }

    return (
        <UserContext.Provider
          value={{
            user,
            pass,
            userId,
            email,
            handleUser,
            handlePass,
            handleEmail,
            handleUserId,
            verify
          }}
        >
            {children}
        </UserContext.Provider>
      );
}