import React, { useEffect, useState } from 'react'
import './CreatePlaylist.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function CreatePlaylist() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const [song,setSong]= useState([])



  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/music', { withCredentials: true })
        console.log(response.data.musics)
        setSong(response.data.musics)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    fetchSongs()
  }, [])
  const submitsong=(data)=>{
    console.log(data)
    axios.post('http://localhost:3002/api/music/playlist',data,{withCredentials:true})
    .then((res)=>{
        console.log(res.data);
        navigate('/')
    })
    .catch((err)=>{
        console.log(err);
    })
   reset()
  }

  return (
    <div className="create-playlist-page">
        
          <label className="form-label">List of Songs</label>

<form action="" onSubmit={handleSubmit(submitsong)}>
    <label htmlFor="">PlaylistName</label>
    <input type="text" {...register("title")}  />
          <div className='ListSong'>{song.map((song) => <div >
<label htmlFor={song._id}>{song.title}</label>

<input type="checkbox" id={song._id} value={song._id} {...register('musics')} 

           />
        </div>)}</div>
<button>submit Song</button>
</form>


        
    </div>
  )
}
