import { FaPlay } from 'react-icons/fa';

const SongTableRow = ({ song, index }) => {
  return (
    <tr className="hover:bg-[#282828] transition-colors group cursor-pointer">
      <td className="py-3 px-4 text-[#b3b3b3] w-12">
        <span className="group-hover:hidden">{index + 1}</span>
        <FaPlay className="hidden group-hover:block text-white text-sm" />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <img
            src={song.cover}
            alt={song.title}
            className="w-10 h-10 rounded"
          />
          <div>
            <div className="text-white font-medium">{song.title}</div>
            <div className="text-[#b3b3b3] text-sm">{song.artist}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-[#b3b3b3]">{song.artist}</td>
      <td className="py-3 px-4 text-[#b3b3b3] text-right">{song.duration}</td>
    </tr>
  );
};

export default SongTableRow;
