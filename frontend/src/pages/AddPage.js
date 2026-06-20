import React, { useState } from 'react';
import axios from 'axios';
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")
  const [caption, setCaption] = useState("")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))

  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!image){
      alert("Select an Image")
    }

    try{
      const formData = new FormData();

      formData.append("image", image)
      formData.append("caption", caption)

      const token = localStorage.getItem("token")

      const response = await axios.post('http://localhost:5000/posts/create', formData, {
        headers : {
          "Content-Type" : "multipart/form-data",
          "Authorization" : ` ${token}`
        }
      })

      alert(response.data.message)

      setImage(null)
      setPreview("")
      setCaption("")

    }catch(error){
      alert(error.response.data)
    }
  }


  return (
    <div className="create-post-container">

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
              <h1 className="nav-header-title-left">New Post</h1>
            </div>
  {/* --- TOP INSTA-STYLE HEADER BAR --- */}
  <div className="create-post-header">
    <h2>New Post</h2>
  </div>

  <form id="create-post-form" className="create-post-form" onSubmit={handleSubmit}>
    
    {/* --- IMAGE UPLOADER ELEMENT --- */}
    <div className="upload-section">
      {preview ? (
        <div className="image-preview-box">
          <img src={preview} alt="post preview" />
          <label htmlFor="file-upload" className="change-photo-lbl">Change Photo</label>
        </div>
      ) : (
        <label htmlFor="file-upload" className="custom-file-upload">
          <div className="upload-placeholder">
            <span className="upload-icon">📸</span>
            <p>Select from computer or device</p>
          </div>
        </label>
      )}
      <input 
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hidden native input for custom styled button UI
      />
    </div>

    {/* --- CAPTION INPUT BOX --- */}
    <div className="caption-section">
      <textarea 
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        maxLength={2200}
      />
    </div>

        <button type="submit" form="create-post-form" className="share-btn">
      Share
    </button>

  </form>
</div>
  )
}

export default AddPage