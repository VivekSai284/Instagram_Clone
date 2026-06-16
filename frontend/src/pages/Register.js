import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Full Name"
          value={registerData.fullname}
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              fullname: e.target.value,
            });
          }}
        />
        <input
          type="text"
          required
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              username: e.target.value,
            });
          }}
        />
        <input
          type="tel"
          maxLength={10}
          required
          placeholder="Phone No."
          value={registerData.phone}
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              phone: e.target.value,
            });
          }}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              password: e.target.value,
            });
          }}
        />
        <input
          type="password"
          required
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            });
          }}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
