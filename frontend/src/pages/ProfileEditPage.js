import React, { useContext } from "react";
import ProfileEdit from "../components/ProfileEdit"
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfileEditPage = () => {
  const { handleEmail, handlePass, email, pass, verify } = useContext(UserContext);
  verify();
  return (
    <div>
      <ProfileEdit email={email} pass={pass} handleEmail={handleEmail} handlePass={handlePass} />
    </div>
  );
}

export default ProfileEditPage;