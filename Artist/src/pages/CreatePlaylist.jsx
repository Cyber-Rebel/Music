import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Upload, X } from "lucide-react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistTracks, createPlaylist } from "../store/actions/musicaction";
import { resetCreatePlaylistState } from "../store/slices/musicslice";

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const { artistTracks, loading, createPlaylistLoading, createPlaylistSuccess, createPlaylistError } = useSelector((state) => state.music);
  console.log("Artist Tracks:", artistTracks);
  const [title, setTitle] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch real uploaded tracks of artist
  useEffect(() => {
    dispatch(fetchArtistTracks());
  }, [dispatch]);

  
  // Handle playlist creation success
  useEffect(() => {
    if (createPlaylistSuccess) {
      alert("Playlist created successfully!");
      setTitle("");
      setSelectedTracks([]);
      setCoverImage(null);
      setCoverPreview(null);
      dispatch(resetCreatePlaylistState());
    }
    if (createPlaylistError) {
      alert(createPlaylistError);
      dispatch(resetCreatePlaylistState());
    }
  }, [createPlaylistSuccess, createPlaylistError, dispatch]);

  const toggleTrack = (id) => {
    if (selectedTracks.includes(id)) {
      setSelectedTracks(selectedTracks.filter((tid) => tid !== id));
    } else {
      setSelectedTracks([...selectedTracks, id]);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(createPlaylist({
      title,
      musics: selectedTracks,
      coverImage,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Playlist</h1>
        <p className="text-(--color-text-secondary)">
          Curate a collection of your best tracks
        </p>
      </div>

      {/* Playlist Form */}
      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <div className="flex flex-col gap-6">

            {/* Cover Image Upload */}
            <div>
              <label className="text-sm font-medium text-(--color-text-secondary) mb-3 block">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 border-2 border-dashed border-(--color-border-subtle) rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-(--color-accent-green) transition-colors"
                  >
                    <Upload size={24} className="text-(--color-text-secondary)" />
                    <span className="text-xs text-(--color-text-secondary) mt-1">Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="text-sm text-(--color-text-secondary)">
                  <p>Upload a cover image for your playlist</p>
                </div>
              </div>
            </div>

            <Input
              label="Playlist Title"
              placeholder="My Awesome Playlist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* TRACK SELECTOR */}
            <div>
              <label className="text-sm font-medium text-(--color-text-secondary) mb-3 block">
                Select Tracks
              </label>

              <div className="border border-(--color-border-subtle) rounded-xl overflow-hidden">
                {loading ? (
                  <p className="text-gray-400 text-center p-4">
                    Loading your tracks...
                  </p>
                ) : artistTracks.length === 0 ? (
                  <p className="text-gray-400 text-center p-4">
                    No uploaded music found.
                  </p>
                ) : (
                  artistTracks.map((track) => {
                    const isSelected = selectedTracks.includes(track._id);

                    return (
                      <div
                        key={track._id}
                        onClick={() => toggleTrack(track._id)}
                        className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-(--color-border-subtle) last:border-0 ${
                          isSelected
                            ? "bg-(--color-accent-green)/10"
                            : "hover:bg-(--color-card-hover)"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-(--color-accent-green) border-(--color-accent-green)"
                                : "border-(--color-text-secondary)"
                            }`}
                          >
                            {isSelected && <Check size={12} className="text-black" />}
                          </div>

                          <div className="flex items-center gap-3">
                            <img
                              src={track.coverUrl}
                              alt={track.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <span
                                className={`font-medium ${
                                  isSelected
                                    ? "text-(--color-accent-green)"
                                    : "text-white"
                                }`}
                              >
                                {track.title}
                              </span>
                              <div className="text-xs text-(--color-text-secondary)">
                                {track.artist} • {track.duration || "Unknown"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={!title || selectedTracks.length === 0 || createPlaylistLoading}
              >
                {createPlaylistLoading ? "Creating..." : "Create Playlist"}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </motion.div>
  );
};

export default CreatePlaylist;
