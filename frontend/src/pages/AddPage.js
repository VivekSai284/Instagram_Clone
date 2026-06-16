import React, { useState } from 'react'
import axios from 'axios'

const AddPage = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")
  const [caption, setCaption] = useState("")

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
    <div>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />

        {preview && (<img src={preview} alt="post"/>)}

        <textarea 
          placeholder='Write a Caption...'
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value)
          }}
        />

        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default AddPage