import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const[posts, setPosts] = useState([])

  const fetchPosts = async() => {
    try{
      const response = await axios.get('http://localhost:5000/posts')
      setPosts(response.data)
    }catch(error){
      alert(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

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
        {posts.map((post) => (
          <div key={post._id}>
            <p>{post.user?.username}</p>
            <img src={`http://localhost:5000/uploads/${post.image}`}/>

            <p><span>{post.user?.username}</span>{post.caption}</p>

            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
