import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PlaylistView.css'
import axios from 'axios'

export default function PlaylistView({ socket }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3002/api/music/playlist/${id}`, { withCredentials: true })
      .then(res => {
        setPlaylist(res.data.playlist)
      })
      .catch(err => {
        console.warn('Could not load playlist:', err?.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="playlist-page"><p className="text-muted">Loading...</p></div>
  if (!playlist) return <div className="playlist-page"><p className="text-muted">Playlist not found.</p></div>

  return (
    <div className="playlist-page">
      <header className="playlist-header">
        <h1 className="playlist-title">{playlist.title}</h1>
        <p className="text-muted">{playlist.musics?.length || 0} tracks</p>
      </header>

      <div className="tracks-list">
        {playlist.musics?.map((m, idx) => (
          <div className="track-row" key={m._id || idx}>
            <div className="track-left">
              <div className="track-index">{idx + 1}</div>
              <div className="track-art">
                <img src={m.coverUrl || ''} alt="" />
              </div>
              <div className="track-meta">
                <div className="track-name">{m.title}</div>
                <div className="track-artist text-muted">{m.artist}</div>
              </div>
            </div>
            <div className="track-actions">
              <button className="btn btn-small" onClick={() => {
                socket?.emit('play', { musicId: m._id })
                navigate(`/music/${m._id}`)
              }}>▶</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
