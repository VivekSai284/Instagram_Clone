import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        profilePic : "",
        fullname: "",
        username: "",
        bio: "",
    });
    const [profilePic, setProfilePic] = useState(null)
    const [preview, setPreview] = useState("")

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const fetchUser = async() => {
        try{
            const response = await axios.get('http://localhost:5000/user/me', {
                headers : {
                    Authorization : `${token}`
                }
            })

            setFormData({
                profilePic : response.data.profilePic || "",
                fullname : response.data.fullname || "",
                username : response.data.username || "",
                bio : response.data.bio || ""
            })
        }catch(error){
            alert(error.response?.data?.message)
        }
    };


    useEffect(() => {
        fetchUser();
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault()
        try{


            if(profilePic){
                const imageData = new FormData();

                imageData.append("image", profilePic);

                const uploadResponse = await axios.put('http://localhost:5000/user/profile-pic', imageData, {
                    headers : {
                        Authorization : `${token}`
                    }
                })

                formData.profilePic = uploadResponse.data.profilePic
            }

            const response = await axios.put('http://localhost:5000/user/edit-profile',formData, {
                headers : {
                    Authorization : `${token}`
                }
            })

            alert("Profile Updated")

            navigate('/profile')


        }catch(error){
            alert(error.response?.data?.message)
        }
    }
  return (
    <div className="edit-profile-container">
            {/* Top Navigation Strip */}
            <div className="edit-profile-navbar">
                <button type="button" className="edit-cancel-btn" onClick={() => navigate('/profile')}>Cancel</button>
                <h2>Edit Profile</h2>
                <div className="navbar-spacer" />
            </div>

            <form onSubmit={handleSubmit} className="edit-profile-form">
                {/* Avatar Photo Selection Container */}
                <div className="edit-avatar-section">
                    <div className="edit-avatar-circle">
                        <img
                            src={preview ? preview : formData.profilePic ? `http://localhost:5000/uploads/${formData.profilePic}` : "/default-avatar.png"}
                            alt='profile preview'
                        />
                    </div>
                    <label htmlFor="edit-profile-file-input" className="change-photo-label-link">
                        Change Profile Photo
                    </label>
                    <input 
                        id="edit-profile-file-input"
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if(!file) return;
                            setProfilePic(file);
                            setPreview(URL.createObjectURL(file));
                        }}
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Form Inputs Fields */}
                <div className="edit-input-group">
                    <label>Name</label>
                    <input 
                        type='text'
                        placeholder='FullName'
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname : e.target.value })}
                        className="edit-text-field"
                    />
                </div>

                <div className="edit-input-group">
                    <label>Username</label>
                    <input 
                        type='text'
                        placeholder='Username'
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username : e.target.value })}
                        className="edit-text-field"
                    />
                </div>

                <div className="edit-input-group">
                    <label>Bio</label>
                    <textarea 
                        placeholder='Bio'
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio : e.target.value })}
                        className="edit-textarea-field"
                        rows="3"
                        maxLength="150"
                    />
                    <span className="bio-char-counter">{formData.bio.length} / 150</span>
                </div>

                <button type='submit' className="edit-save-submit-btn">Save Changes</button>
            </form>
        </div>
  )
}

export default EditProfile