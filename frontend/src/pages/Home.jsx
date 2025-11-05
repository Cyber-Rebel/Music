import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home({ socket }) {
  const navigate = useNavigate();

  // Start empty — load from API. Remove dummy data.
  const [ musics, setMusics ] = useState([])
  const [ playlists, setPlaylists ] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3002/api/music", { withCredentials: true })
      .then(res => {
        console.log(res.data.musics)
        setMusics(res.data.musics.map(m => ({
          id: m._id,
          title: m.title,
          artist: m.artist,
          coverImageUrl: m.coverUrl,
          musicUrl: m.musicUrl,
        })))
      })

    axios.get("http://localhost:3002/api/music/playlist", { withCredentials: true })
      .then(res => {
        setPlaylists(res.data.playlists.map(p => ({
          id: p._id,
          title: p.title,
          count: p.musics.length
        })))
      })

  }, [])

  return (
    <div className="home-page stack" style={{ gap: 'var(--space-8)' }}>
      <header className="home-hero">
        <h1 className="home-title">Discover</h1>
        <p className="text-muted home-tag">Trending playlists and new releases</p>
      </header>

      <section className="home-section">
        <div className="section-head">
          <h2 className="section-title">Playlists</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="btn btn-small"
              type="button"
              onClick={() => navigate('/playlist/create')}
              aria-label="Create playlist"
            >
              + Create
            </button>
            <button className="btn btn-small" type="button">View All</button>
          </div>
        </div>
        <div className="playlist-grid">
          {playlists.length === 0 && (
            <p className="text-muted">No playlists yet.</p>
          )}
          {playlists.map(p => (
            <div key={p.id} className="playlist-card surface" tabIndex={0} onClick={() => navigate(`/playlist/${p.id}`)}>
              <div className="playlist-info">
                <h3 className="playlist-title" title={p.title}>{p.title}</h3>
                <p className="playlist-meta text-muted">{p.count} tracks</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2 className="section-title">Musics</h2>
          <button className="btn btn-small" type="button">Explore</button>
        </div>
        <div className="music-grid">
          {musics.length === 0 && (
            <p className="text-muted">No tracks available.</p>
          )}
          {musics.map(m => (
            <div
              onClick={() => {
                socket?.emit("play", { musicId: m.id })
                navigate(`/music/${m.id}`)
              }}
              key={m.id} className="music-card surface" tabIndex={0}>
              <div className="music-cover-wrap">
                <img src={m.coverImageUrl} alt="" className="music-cover" />
              </div>
              <div className="music-info">
                <h3 className="music-title" title={m.title}>{m.title}</h3>
                <p className="music-artist text-muted" title={m.artist}>{m.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

