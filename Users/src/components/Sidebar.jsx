import { NavLink } from 'react-router-dom';
import { FaHome, FaMusic, FaList, FaPlus } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/playlists', label: 'Public Playlists', icon: <FaMusic /> },
    { path: '/artist-playlists', label: 'Artist Playlists', icon: <MdLibraryMusic /> },
  ];

  const libraryItems = [
    { path: '/my-playlists', label: 'My Playlists', icon: <FaList /> },
    { path: '/create-playlist', label: 'Create Playlist', icon: <FaPlus /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static
        w-[250px] min-w-[250px] shrink-0 
        bg-black h-screen flex flex-col 
        overflow-y-auto z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaMusic className="text-[#1db954] text-2xl" />
            <span className="tracking-tight">Musify</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg text-[#b3b3b3] hover:text-white transition-all duration-200 ${
                      isActive ? 'bg-[#282828] text-white' : 'hover:bg-[#181818]'
                    }`
                  }
                >
                  <span className="text-xl min-w-[24px] flex justify-center">{item.icon}</span>
                  <span className="font-semibold text-[15px]">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-[#282828] my-6"></div>

          {/* Library Section */}
          <ul className="space-y-1">
            {libraryItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg text-[#b3b3b3] hover:text-white transition-all duration-200 ${
                      isActive ? 'bg-[#282828] text-white' : 'hover:bg-[#181818]'
                    }`
                  }
                >
                  <span className="text-xl min-w-[24px] flex justify-center">{item.icon}</span>
                  <span className="font-semibold text-[15px]">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#282828] mt-auto">
          <p className="text-xs text-[#b3b3b3] text-center font-medium">
            © 2025 Musify
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
