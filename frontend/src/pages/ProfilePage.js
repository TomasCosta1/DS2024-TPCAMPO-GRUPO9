import React, { useContext } from "react";
import Profile from "../components/Profile";
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { handleUser, handleEmail, handlePass } = useContext(UserContext);
  return (
    <div>
      <Profile />
    </div>
  );
}

export default ProfilePage;