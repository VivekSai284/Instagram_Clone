import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsSend,
  BsBookmark,
} from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        },
      );

      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-items">
          <Link to="/add" className="nav-icon-link" title="Add Post">
            <FiPlus size={22} />
          </Link>
          <div className="logo">Instagram</div>
          <Link
            to="/notifications"
            className="nav-icon-link"
            title="Notifications"
          >
            <BsHeart size={22} />
          </Link>
        </div>
      </nav>

      <div className="home-feed">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <Link to={`/profile/${post.user._id}`} >
              <img
                src={
                  post.user?.profilePic
                    ? `http://localhost:5000/uploads/${post.user.profilePic}`
                    : "/default-avatar.png"
                }
                alt="profile"
                
              />
              </Link>
              <Link to={`/profile/${post.user._id}`} className="post-header-link">
              <p className="post-username">{post.user?.username}</p>
              </Link>
            </div>

            <img
              className="post-img"
              src={`http://localhost:5000/uploads/${post.image}`}
              alt="post"
              onDoubleClick={() => handleLike(post._id)}
            />

            <div className="post-actions-ribbon">
              <div className="left-actions">
                <button
                  className={`action-btn like-btn ${post.likes.some((id) => id && id.toString() === userId) ? "liked" : ""}`}
                  onClick={() => handleLike(post._id)}
                >
                  {post.likes.some((id) => id && id.toString() === userId) ? (
                    <BsHeartFill size={24} />
                  ) : (
                    <BsHeart size={24} />
                  )}
                  <span className="post-likes">{post.likes?.length || 0} </span>
                </button>
                <button className="action-btn">
                  <BsChat size={24} />
                </button>
                <button className="action-btn">
                  <BsSend size={24} />
                </button>
              </div>
              <div className="right-actions">
                <button className="action-btn">
                  <BsBookmark size={24} />
                </button>
              </div>
            </div>

            <div className="post-content">
              <p className="post-caption">
                <span className="post-caption-username">
                  {post.user?.username}
                </span>
                {post.caption}
              </p>

              <p className="post-time">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
