import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo, FaVolumeUp, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(45);

  // Dummy current song
  const currentSong = {
    title: "Dreams",
    artist: "Nexa",
    cover: "https://placehold.co/100x100/1db954/ffffff?text=Dreams"
  };

  return (
    <div className="fixed bottom-0 left-0 lg:left-[250px] right-0 bg-[#181818] border-t border-[#282828] px-2 lg:px-4 py-2 lg:py-3 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Left - Current Song Info */}
        <div className="flex items-center gap-2 lg:gap-3 w-auto lg:w-1/4 min-w-0 lg:min-w-[180px]">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded"
          />
          <div className="flex-1 min-w-0 hidden sm:block">
            <div className="text-white text-xs lg:text-sm font-medium truncate">
              {currentSong.title}
            </div>
            <div className="text-[#b3b3b3] text-xs truncate">
              {currentSong.artist}
            </div>
          </div>
          <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
            <FaHeart className="text-base lg:text-lg" />
          </button>
        </div>

        {/* Center - Player Controls */}
        <div className="flex flex-col items-center gap-1 lg:gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-3 lg:gap-6">
            <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
              <FaRandom className="text-sm" />
            </button>
            <button className="text-[#b3b3b3] hover:text-white transition-colors">
              <FaStepBackward className="text-base lg:text-lg" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-black p-2 lg:p-2.5 rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <FaPause className="text-base lg:text-lg" />
              ) : (
                <FaPlay className="text-base lg:text-lg ml-0.5" />
              )}
            </button>
            <button className="text-[#b3b3b3] hover:text-white transition-colors">
              <FaStepForward className="text-base lg:text-lg" />
            </button>
            <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
              <FaRedo className="text-sm" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#b3b3b3] w-8 lg:w-10 text-right">1:45</span>
            <div className="flex-1 bg-[#4d4d4d] h-1 rounded-full overflow-hidden group cursor-pointer">
              <div
                className="bg-[#b3b3b3] group-hover:bg-[#1db954] h-full transition-colors relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-[#b3b3b3] w-8 lg:w-10">3:45</span>
          </div>
        </div>

        {/* Right - Volume Control */}
        <div className="hidden lg:flex items-center gap-3 w-1/4 justify-end">
          <FaVolumeUp className="text-[#b3b3b3]" />
          <div className="w-24 bg-[#4d4d4d] h-1 rounded-full overflow-hidden group cursor-pointer">
            <div
              className="bg-[#b3b3b3] group-hover:bg-[#1db954] h-full transition-colors relative"
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
