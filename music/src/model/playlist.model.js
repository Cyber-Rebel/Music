const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    coverUrl: {
        type: String,
    }
}, { timestamps: true });

const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
