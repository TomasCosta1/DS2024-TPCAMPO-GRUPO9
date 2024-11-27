import React, { useContext } from "react";
import ProfileEdit from "../components/ProfileEdit"
import "../styles/Login.css";
import { UserContext } from "../context/UserContext";

const ProfileEditPage = () => {
  const { handleEmail, email, verify } = useContext(UserContext);
  verify();
  return (
    <div>
      <ProfileEdit email={email} handleEmail={handleEmail} />
    </div>
  );
}

export default ProfileEditPage;