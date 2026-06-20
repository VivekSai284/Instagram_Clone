import React, { useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [users, setUsers] = useState([])

  const handleSearch = async(value) => {
    setKeyword(value);

    if (!value.trim()) {
    setUsers([]);
    return;
  }


    try{
      const response = await axios.get(`http://localhost:5000/user/search/${value}`)

      setUsers(response.data)
    }catch(error){
      alert(error)
    }
  }

  
  return (
    <div className="search-page-container">
  {/* --- FLOATING TOP SEARCH HEADER BAR --- */}
  <div className="search-bar-header">
    <div className="search-input-wrapper">
      <input
        type='text'
        placeholder='Search Users...'
        value={keyword}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input-field"
      />
    </div>
  </div>

  {/* --- RESULTS ITERATION FEED --- */}
  <div className="search-results-list">
    {users.map((user) => (
      <Link
        key={user._id}
        to={`/profile/${user._id}`}
        className="search-user-row-link"
      >
        <div className="search-user-card">
          <img
            src={
              user.profilePic
                ? `http://localhost:5000/uploads/${user.profilePic}`
                : "/default-avatar.png"
            }
            alt={`${user.username}'s profile`}
            className="search-user-avatar"
          />

          <div className="search-user-text-meta">
            <h4 className="search-user-username">{user.username}</h4>
            <p className="search-user-fullname">{user.fullname || "Instagram User"}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
  )
}

export default Search