  import React from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { LayoutDashboard, Upload, Music, ListMusic, LogOut, X } from 'lucide-react';
  import { logout } from '../store/actions/useraction';

  const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const links = [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/upload', label: 'Upload Music', icon: Upload },
      { path: '/create-playlist', label: 'Playlists', icon: ListMusic },
        { path: '/artist/playlist', label: 'My Playlists', icon: ListMusic },
    ];

    const handleLinkClick = () => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    };

    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Sidebar */}
        <div className={`w-64 h-screen bg-(--color-bg-main) border-r border-(--color-border-subtle) flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-(--color-accent-green) rounded-full flex items-center justify-center text-black text-lg">A</span>
            Artist<span className="text-(--color-accent-green)">Hub</span>
          </h1>
          <button 
            onClick={onClose}
            className="lg:hidden text-(--color-text-secondary) hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-(--color-card-hover) text-white border-l-4 border-(--color-accent-green)' 
                    : 'text-(--color-text-secondary) hover:text-white hover:bg-(--color-card-hover)'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-(--color-border-subtle)">
            <button 
              onClick={() => dispatch(logout())}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-(--color-text-secondary) hover:text-red-400 hover:bg-(--color-card-hover) transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
        </div>
      </div>
      </>
    );
  };

  export default Sidebar;
