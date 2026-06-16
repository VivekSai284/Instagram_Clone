import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="add">
          <Link to="/add">ADD</Link>
        </div>

        <div className="logo">INSTA CLONE</div>

        <div className="notification">
          <Link to="/notifications">NOTI</Link>
        </div>
      </nav>

      <div>
        <h1>Home Feed</h1>
      </div>
    </div>
  );
};

export default Home;
