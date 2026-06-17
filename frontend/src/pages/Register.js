import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(registerData.phone)) {
      return alert("Enter a valid 10-digit phone number");
    }

    if (registerData.password !== registerData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        registerData,
      );
      alert(response.data.message);
      navigate('/login')
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page-container">
  <div className="auth-card">
    <h1 className="auth-logo">Instagram</h1>
    <p className="auth-subtitle">Sign up to see posts from your friends.</p>
    
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        placeholder="Full Name"
        value={registerData.fullname}
        onChange={(e) => setRegisterData({ ...registerData, fullname: e.target.value })}
      />
      <input
        type="text"
        required
        placeholder="Username"
        value={registerData.username}
        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
      />
      <input
        type="tel"
        maxLength={10}
        required
        placeholder="Phone No."
        value={registerData.phone}
        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
      />
      <input
        type="password"
        required
        placeholder="Confirm Password"
        value={registerData.confirmPassword}
        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
      />

      <button className="auth-submit-btn" type="submit">Register</button>
    </form>
  </div>

  <div className="auth-toggle-card">
    <p>Already Registered? <Link to='/login'>Login</Link></p>
  </div>
</div>
  );
};

export default Register;
