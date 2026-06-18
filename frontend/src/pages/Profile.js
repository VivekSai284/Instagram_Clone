import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/posts/my-posts", {
        headers: { Authorization: `${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const fetchUsers = async (req, res) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/user/me", {
        headers: {
          Authorization: `${token}`,
        },
      });

      setUsername(response.data.username);
      setFullName(response.data.fullname);
      setProfilePic(response.data.profilePic);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/user/profile-pic",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      setProfilePic(response.data.profilePic);

      alert("ProfilePic updated");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="profile-container">
      {/* --- FIXED TOP USERNAME NAVBAR --- */}
      <div className="profile-top-navbar">
        <div className="dropdown-wrapper">
          <div
            className="navbar-username-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <h2>{username || "Profile"}</h2>
            <FiChevronDown
              size={16}
              className={`chevron ${dropdownOpen ? "open" : ""}`}
            />
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown-menu">
              {token ? (
                <button
                  className="dropdown-item logout-action"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- NEW ROW LAYOUT: [AVATAR]  [FULLNAME, STATS] --- */}
      <header className="profile-hero-row">
        <div className="avatar">
          <label htmlFor="avatar-upload-input" className="avatar-ring-label">
            {profilePic ? (
              <img
                src={`http://localhost:5000/uploads/${profilePic}`}
                alt="profile"
                className="profile-avatar-img"
              />
            ) : (
              <div className="avatar-placeholder-fallback" />
            )}
            {/* Subtle camera icon or edit label on hover */}
            <div className="avatar-overlay-hint">Change</div>
          </label>
          <input
            id="avatar-upload-input"
            type="file"
            accept="image/*"
            onChange={handleProfilePic}
            style={{ display: "none" }} // Safely hides the default browser upload text button
          />
        </div>

        <div className="info-side">
          <h1 className="profile-display-fullname">
            {fullName || "Instagram User"}
          </h1>

          <div className="profile-stats-inline">
            <div className="stat-item">
              <div className="stat-count">{posts.length}</div>{" "}
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">0</div>{" "}
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">0</div>{" "}
              <span className="stat-label">following</span>
            </div>
          </div>
        </div>
      </header>

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

export default Profile;
