import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginData,
      );
      localStorage.setItem('token', response.data.token)
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={loginData.username}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              username: e.target.value,
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
        <p>New User?<Link to='/register'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
