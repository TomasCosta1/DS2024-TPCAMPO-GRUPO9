import React, { useContext } from "react";
import Profile from "../components/Profile";
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { email, verify } = useContext(UserContext);
  verify();
  return (
    <div>
      <Profile email={email} verify={verify} />
    </div>
  );
}

export default ProfilePage;