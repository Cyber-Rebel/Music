import axios from "axios";
import { setCurrentMusic, setAllMusic, setArtistPlaylist } from "../slices/musicSlice.jsx";

export const fetchMusicData = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/api/music',{
        withCredentials: true,
      });
        const musicData = response.data.musics || [];
        dispatch(setAllMusic(musicData));

    }catch (error) {
        console.error("Error fetching music data:", error);
    }
}
export const specificMusicData = (id) => async (dispatch) => {
    try{
        const response = await axios.get(`http://localhost:3001/api/music/get-details/${id}`,{
            withCredentials: true,
        });
        const currentMusic = response.data.music || response.data;
        dispatch(setCurrentMusic(currentMusic));
    } catch (error) {
        console.error("Error fetching specific music data:", error);
    }
};


export const artistPlaylistFetch = () => async (dispatch) => {
    try {
       const response = await axios.get('http://localhost:3001/api/music/allPlaylist',{
        withCredentials: true,
       });
       const playlistData = response.data.playlists || [];
       dispatch(setArtistPlaylist(playlistData));
    } catch (error) {
        console.error("Error setting playlist data:", error);
    }
};

export const fetchSinglePlaylist = async (id) => {
    try {
        // Fetch playlist
        const response = await axios.get(`http://localhost:3001/api/music/playlist/${id}`, {
            withCredentials: true,
        });
        const playlist = response.data.playlist || response.data;
        
        // If musics array contains ObjectIds, fetch each song's details
        if (playlist.musics && playlist.musics.length > 0) {
            const songPromises = playlist.musics.map(async (musicId) => {
                try {
                    const songRes = await axios.get(`http://localhost:3001/api/music/get-details/${musicId}`, {
                        withCredentials: true,
                    });
                    return songRes.data.music || songRes.data;
                } catch (err) {
                    console.error("Error fetching song:", musicId, err);
                    return null;
                }
            });
            
            const songs = await Promise.all(songPromises);
            playlist.songs = songs.filter(song => song !== null);
        }
        
        return playlist;
    } catch (error) {
        console.error("Error fetching single playlist:", error);
        throw error;
    }
};  
