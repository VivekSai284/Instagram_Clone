import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`, {
        headers : {
          Authorization : `${token}`
        }
      });

      setUser(response.data);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      alert(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${userId}/posts`,
      );
      setPosts(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      console.log(response.data);
      setIsFollowing(response.data.following);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [userId]);

  if (!user) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="profile-container">
      <div className="top-nav-bar-left">
        {/* Back Navigation Button */}
        <button
          className="nav-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiArrowLeft size={24} />
        </button>

        {/* Username positioned directly right after the icon */}
        <h1 className="nav-header-title-left">{user?.username || "Profile"}</h1>
      </div>

      {/* --- NEW ROW LAYOUT: [AVATAR]  [FULLNAME, STATS] --- */}
      <header className="profile-hero-row">
        <div className="avatar">
          <label htmlFor="avatar-upload-input" className="avatar-ring-label">
            <img
              src={
                user.profilePic
                  ? `http://localhost:5000/uploads/${user.profilePic}`
                  : "/default-avatar.png"
              }
              alt="profile"
              className="profile-avatar-img" /* Added this styling hook */
            />
          </label>
        </div>

        <div className="info-side">
          <h1 className="profile-display-fullname">
            {user.fullname || "Instagram User"}
          </h1>

          <div className="profile-stats-inline">
            <div className="stat-item">
              <div className="stat-count">{posts.length}</div>{" "}
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">{user?.followers?.length || 0}</div>{" "}
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">{user?.following?.length || 0}</div>{" "}
              <span className="stat-label">following</span>
            </div>
          </div>
        </div>
      </header>
      <div style={{ padding: "0 20px" }}>
        <button
          onClick={handleFollow}
          className={`follow-btn ${isFollowing ? "following-state" : "follow-state"}`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* --- SEPARATOR POSTS TAB --- */}
      <div className="profile-tabs-separator">
        <div className="tab-item active">POSTS</div>
      </div>

      {/* --- IMAGES GRID [POSTS] --- */}
      <main className="profile-posts-grid">
        {posts.map((post) => (
          <div className="post-grid-item" key={post._id}>
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.caption || "Instagram post"}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default UserProfile;
