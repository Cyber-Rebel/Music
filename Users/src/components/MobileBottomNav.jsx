import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMusic, FaHeart, FaUserFriends, FaBroadcastTower } from 'react-icons/fa';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/my-playlists', icon: FaMusic, label: 'Playlist' },
    { path: '/liked-songs', icon: FaHeart, label: 'Liked' },
    { path: '/join-friends', icon: FaUserFriends, label: 'Friends' },
    { path: '/control-room/:code', icon: FaBroadcastTower, label: 'Room' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-2 z-40">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-[#1db954]' 
                  : 'text-[#b3b3b3] hover:text-white'
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
