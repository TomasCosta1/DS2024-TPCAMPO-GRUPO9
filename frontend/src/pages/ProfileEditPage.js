import React, { useContext } from "react";
import ProfileEdit from "../components/ProfileEdit"
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfileEditPage = () => {
  const { handleUser, handleEmail, handlePass, email, pass } = useContext(UserContext);
  return (
    <div>
      <ProfileEdit email={email} pass={pass} handleEmail={handleEmail} handlePass={handlePass} />
    </div>
  );
}

export default ProfileEditPage;