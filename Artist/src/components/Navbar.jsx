import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, Search, User, Menu } from 'lucide-react';
import { fetchArtistProfile } from '../store/actions/useraction';

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch artist profile if not already loaded
    if (!user && !loading) {
      dispatch(fetchArtistProfile());
    }
  }, [dispatch, user, loading]);

  const getFullName = () => {
    if (!user) return 'Loading...';
    if (user.fullName) {
      const { firstName, lastName } = user.fullName;
      return `${firstName || ''} ${lastName || ''}`.trim() || 'Artist';
    }
    return user.name || 'Artist';
  };

  const getInitials = () => {
    if (!user) return 'U';
    if (user.fullName) {
      const { firstName, lastName } = user.fullName;
      return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'A';
    }
    return user.name?.[0]?.toUpperCase() || 'A';
  };

  return (
    <header className="h-16 bg-(--color-bg-main)/80 backdrop-blur-md border-b border-(--color-border-subtle) flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden text-(--color-text-secondary) hover:text-white transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden sm:flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-(--color-bg-card) border border-(--color-border-subtle) rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-(--color-accent-green) transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button className="text-(--color-text-secondary) hover:text-white transition-colors relative hidden sm:block">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-(--color-accent-green) rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-(--color-border-subtle)">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">
              Hi, {getFullName()}
            </p>
            <p className="text-xs text-(--color-text-secondary)">
              {user?.role === 'artist' ? 'Artist Account' : 'User Account'}
            </p>
          </div>
          <div className="w-10 h-10 bg-(--color-card-hover) rounded-full flex items-center justify-center border border-(--color-border-subtle) text-white font-medium text-sm">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={getFullName()} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials()
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
