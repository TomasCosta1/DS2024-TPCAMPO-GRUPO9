import React, { useContext } from "react";
import Login from "../components/Login";
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const { handleUser, handleEmail, handleUserId } = useContext(UserContext);
  return (
    <div>
      <Login handleUser={handleUser} handleEmail={handleEmail} handleUserId={handleUserId} />
    </div>
  );
}

export default LoginPage;