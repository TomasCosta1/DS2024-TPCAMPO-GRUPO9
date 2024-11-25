import React, { useContext } from "react";
import Profile from "../components/Profile";
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { handleUser, handleEmail, handlePass, email, pass } = useContext(UserContext);
  return (
    <div>
      <Profile email={email} pass={pass} />
    </div>
  );
}

export default ProfilePage;