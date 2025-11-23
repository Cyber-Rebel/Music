import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit - just navigate back
    alert('Playlist created! (Dummy action)');
    navigate('/my-playlists');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cover: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Create New Playlist</h1>

      <form onSubmit={handleSubmit} className="bg-[#181818] rounded-lg p-8 space-y-6">
        {/* Cover Upload */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Playlist Cover
          </label>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 bg-[#282828] rounded-lg flex items-center justify-center overflow-hidden">
              {formData.cover ? (
                <img
                  src={formData.cover}
                  alt="Playlist cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaImage className="text-6xl text-[#b3b3b3]" />
              )}
            </div>
            <div>
              <label
                htmlFor="cover-upload"
                className="bg-[#1db954] text-black px-6 py-3 rounded-full font-semibold cursor-pointer hover:scale-105 transition-transform inline-block"
              >
                Choose Image
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-[#b3b3b3] text-sm mt-2">
                Recommended: Square image, at least 300x300px
              </p>
            </div>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Playlist Title <span className="text-[#1db954]">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="My Awesome Playlist"
            required
            className="w-full bg-[#282828] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] placeholder-[#b3b3b3]"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-white font-semibold mb-3">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about your playlist..."
            rows={4}
            className="w-full bg-[#282828] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] placeholder-[#b3b3b3] resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-[#1db954] text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Create Playlist
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#282828] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3e3e3e] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;
