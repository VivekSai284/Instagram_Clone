import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Notifications = () => {
  const navigate = useNavigate()
  return (
    <div>
              <button
                className="nav-back-btn"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <FiArrowLeft size={24} />
              </button>

              <h1>Notification</h1>
    </div>
  )
}

export default Notifications