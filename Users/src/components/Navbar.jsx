import { FaSearch, FaBars } from 'react-icons/fa';
import { user } from '../data/dummyData';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-black border-b border-[#282828] px-4 lg:px-6 py-3 flex items-center gap-4 sticky top-0 z-50">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-white text-xl p-2 hover:bg-[#282828] rounded-lg transition-colors shrink-0"
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md lg:max-w-2xl">
        <div className="relative">
          <FaSearch className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#b3b3b3] text-xs lg:text-sm pointer-events-none" />
          <input
            type="text"
            placeholder="Search for songs, artists..."
            className="w-full bg-[#242424] text-white text-sm lg:text-[15px] pl-9 lg:pl-12 pr-4 py-2.5 lg:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:bg-[#2a2a2a] placeholder-[#a7a7a7] transition-all font-normal"
          />
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-2 lg:gap-3 bg-[#282828] hover:bg-[#3e3e3e] px-2 lg:px-3 py-1.5 lg:py-2 rounded-full cursor-pointer transition-all shrink-0">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-7 h-7 lg:w-8 lg:h-8 rounded-full ring-2 ring-[#121212]"
        />
        <span className="text-white font-semibold text-xs lg:text-sm hidden sm:inline-block pr-1 max-w-[120px] truncate">{user.name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
