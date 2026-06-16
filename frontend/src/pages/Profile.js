import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload();
  }
  return (
    <div>
      Profile
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Profile;
