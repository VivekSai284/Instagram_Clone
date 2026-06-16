import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(loginData.phone)) {
      return alert("Enter a valid 10-digit phone number");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginData,
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          maxLength={10}
          placeholder="Phone no."
          required
          value={loginData.phone}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              phone: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={loginData.password}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
