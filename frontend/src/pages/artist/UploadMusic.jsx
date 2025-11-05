import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
function UploadMusic() {
    const {register,reset,handleSubmit}= useForm()
    const formData=(data)=>{
        const formData = new FormData();
        formData.append("title", data.title);
        // accept video files now
        formData.append("video", data.video[0]);
        formData.append("coverImage", data.coverImage[0]);
        axios.post('http://localhost:3002/api/music/upload',formData,{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            reset()
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className="upload-music-page">
      <div className="upload-form">
        <h2 className="upload-title">Upload Video</h2>
        <p className="upload-sub text-muted">Upload a video file for your music video (MP4, WebM etc.) and a cover image.</p>

        <form action="" onSubmit={handleSubmit(formData)}>
          <div className="field-group">
            <label>Title</label>
            <input type="text" className="form-input" {...register("title")} required />
          </div>

          <div className="field-group">
            <label>Video file</label>
            <input type="file" accept='video/*' {...register("video")} required />
          </div>

          <div className="field-group">
            <label>Cover image</label>
            <input type="file" accept='image/*' {...register("coverImage")} />
          </div>

          <div className="form-actions">
            <button className="btn btn-cancel" type="button" onClick={() => reset()}>Cancel</button>
            <button className="btn btn-upload" type="submit">Upload Video</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadMusic